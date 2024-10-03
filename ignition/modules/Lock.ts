import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI: bigint = 1_000_000_000n;

const UseRemoveLiquidityModule = buildModule(
  "UseRemoveLiquidityModule",
  (m) => {
    const router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    const lock = m.contract("UseRemoveLiquidity", [router]);

    return { lock };
  }
);

export default UseRemoveLiquidityModule;

// https://sepolia-blockscout.lisk.com//address/0xeE4b7475D7bDaB1dD07364eB944CC6Ad025b646C#code
