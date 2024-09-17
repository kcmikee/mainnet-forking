// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;
import "./interfaces/IUniswapV2Router2.sol";
import "./interfaces/IERC20.sol";

contract UseRemoveLiquidity {
    address public uniswapRouter;
    address public owner;
    uint public swapCount;
    uint public removeCount;

    constructor(address _uniswapRouter) {
        uniswapRouter = _uniswapRouter;
        owner = msg.sender;
    }

    // function handleSwap(
    //     uint amountOut,
    //     uint amountInMax,
    //     address[] calldata path,
    //     address to,
    //     uint deadline
    // ) external {
    //     IERC20(path[0]).transferFrom(msg.sender, address(this), amountInMax);

    //     require(
    //         IERC20(path[0]).approve(uniswapRouter, amountInMax),
    //         "approve failed."
    //     );

    //     IUniswapV2Router(uniswapRouter).swapTokensForExactTokens(
    //         amountOut,
    //         amountInMax,
    //         path,
    //         to,
    //         deadline
    //     );

    //     swapCount += 1;
    // }

    function removeLiquidity(
        address _tokenA,
        address _tokenB,
        uint _liqidity,
        uint _amountAMin,
        uint _amountBMin,
        address _to,
        uint deadline
    ) external {
        require(
            IERC20(_tokenA).approve(uniswapRouter, _amountAMin),
            "A approval failed."
        );

        require(
            IERC20(_tokenB).approve(uniswapRouter, _amountBMin),
            "B approval failed."
        );

        IUniswapV2Router01(uniswapRouter).removeLiquidity(
            _tokenA,
            _tokenB,
            _liqidity,
            _amountAMin,
            _amountBMin,
            _to,
            deadline
        );
        removeCount += 1;
    }
}
