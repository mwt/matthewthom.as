---
title: "How to Fund Open Source"
author: "Matthew Wildrick Thomas"
layout: "post"
tag: ["math", "economics", "mechanism design"]
date: "2021-03-11"
use_math: true
---

I recently came across [an interesting paper](https://arxiv.org/abs/1809.06421v2) published in Management Science that proposes Quadratic Finance (QF), a mechanism to fund public goods such as open source software. This has generated an understandable amount of excitement and there are already several cases in which it has been implemented.

* [FundOSS](https://fundoss.org/)
* [Gitcoin Grants](https://gitcoin.co/grants/)
* [Downtown Stimulus](https://downtownstimulus.com/)
* [clr.fund](https://clr.fund/)

I wanted to take the time to clarify a few common misconceptions about QF and explain what it actually is and is not. Moreover, implementations of QF have modified the mechanism in ways that are not efficient and often worse than more common allocation approaches.

The basic problem with funding a public good is that people do not pay if they can take advantage of the good for free. So, collected payments/donations are always less than they should be. This is not a problem that QF solves. Several sources claim QF is "the mathematically optimal way to fund public goods in a democratic community" [(Gitcoin)](https://wtfisqf.com/). This is not entirely true. QF was not designed to solve the problem of *funding* public goods. It is not a mechanism for optimal fundraising. It was instead designed to solve the following problem:

> How can we efficiently allocate resources to public goods given that we have *unlimited* access to resources.

Note that this is about allocation. QF was not designed to have the greatest revenue of any mechanism. It doesn't tell you how to raise money. It instead tells you where you should put it once it is raised.

This is a classic Economic problem that was technically solved by Vickrey, Clarke, and Groves in [three](https://scholar.archive.org/search?q=key:work_fsr6vuy2g5gihnp3znw4xmvqnu) [separate](https://scholar.archive.org/search?q=key:work_jqeqfsyhpzc5vp44oky4czop6y) [papers](https://scholar.archive.org/search?q=key:work_roir55hgbze27pqsfuxehnyvky). A quick summary of their mechanism (VCG) is essential for understanding what QF is about.

## Classic VCG

The idea behind VCG is pretty simple. Suppose we are looking at [funding webpack](https://opencollective.com/webpack), a popular open source project. Suppose the value for person $$i$$ of webpack having an annual budget of $$x$$ is $$ v_i(x) $$ where $$ v_i $$ is a concave, differentiable, and increasing function[^1] with $$ v_i(0) \equiv 0 $$. The efficient level of funding for webpack is the $$ x^\star $$ that maximizes society's payoff:

$$
\left[ \sum_{i} v_i(x) \right] - x. \tag{1}
$$

However, people only care about their own value -- not the value of others. So, they would not be willing to give as much. To fix this, we conduct a three step process.

1. Ask everyone for their $$v_i(x)$$.
2. Find the $$x^\star$$ that maximizes equation 1.
3. Give each agent a transfer of $$ \left[ \sum_{j \neq i} v_j( x^\star ) \right] - x^\star $$.

When they add their own $$v_i(x)$$ to the transfer, their personal payoff is exactly the same as society's (Equation 1). Because of this, they want $$x^\star$$ to be calculated correctly. So, they have no reason to lie about their value, $$v_i$$.

The transfers noted above are very expensive. However, they can be made much cheaper because you can subtract any constant from these transfers. In fact, you can subtract any function that does not depend on $$v_i$$.[^2] When the ideal function is chosen,[^3] the assumptions we made ensure the VCG mechanism raises funds. In fact, there is no incentive compatible efficient mechanism that raises more funds [(Krishna and Perry 1998)](https://scholar.archive.org/search?q=key:work_5qnsclqtdvfgvo5o7iwr2bpl6i).

### Issues

There are two major issues with the VCG mechanism:

1. It requires too much information
2. It fails if bidders can work together (i.e. collude)
3. It raises less than $$ x^\star $$ and thus requires subsidization

VCG requires that each participant know their exact valuation for each level of total funding for every open source project. This is typically unreasonable. Issue 2 is somewhat overblown as the ways to cheat in VCG are generally NP-hard to compute. However, there are interesting restricted cases where the optimal collusion scheme can be computed in polynomial time.

The issue is an important one that cannot be easily solved. Remember that there is no incentive compatible efficient mechanism that collects more revenue than VCG. So, collecting more funds requires sacrificing efficiency -- an issue not dealt with here.

## Quadratic finance

The aforementioned paper considers QF, a different allocation mechanism which solves the first issue with VCG (i.e. that it requires too much information) and it solves this brilliantly.

The QF mechanism allocates resources according to

$$
x^\star = \left( \sum_i \sqrt{c_i} \right)^2 \tag{2}
$$

where $$ c_i $$ is an individual contribution made by each participant. So, participants no longer need to send their value for every level of funding. They instead just need to choose a contribution. This is both more reasonable and more private as less information is surrendered. The central point of the paper is that, in equilibrium, this $$ x^\star $$ is the same as the one we considered in the VCG section.

The goal of QF is not to maximize $$ \sum_i c_i $$, but to instead find a function that achieves the socially optimal resource allocation, $$ x^\star $$.

### Issues

The issues with QF are similar to VCG.

1. It fails if bidders can work together (i.e. collude)
2. The deficit is typically larger than with VCG

Collusion in QF is particularly easy. If you want to contribute $$ c_i $$ and have friends who want to contribute nothing, then you can do better by contributing less and dividing your contributions amongst your friends. The second problem is a big problem for applying both QF and VCG because the deficit is unbounded. Therefore, unlimited resources are needed to make the mechanism work. This is somewhat reasonable for governments who can tax their citizens.[^4]

It is not reasonable when the funds are raised by a foundation or philanthropist. However, the authors note this problem and propose an approximate solution called CQF

$$
x^\circ = \alpha \left( \sum_i \sqrt{c_i} \right)^2 + (1 - \alpha) \sum_i c_i
$$

where $$ 0 \leq \alpha \leq 1 $$. When $$ \alpha = 0 $$, CQF is the standard donation model with no subsidies. When $$ \alpha = 1 $$, CQF is the same as QF and thus achieves the optimal allocation. At every $$ \alpha $$ in between, CQF is a mix of the two. That is, CQF has a smaller deficit than QF and results in a better[^5] allocation than private donations. However, CQF does not yield an efficient allocation unless $$ \alpha = 1 $$.

## Implementations

Implementations of QF have not actually implemented QF or CQF. They have instead implemented the following rule which I call NQF:

$$
\tilde{x}^p = \left[ \sum_i c_i^p \right] + G \frac{\left( \sum_i \sqrt{c_i^p} \right)^2}{ \sum_p \left( \sum_i \sqrt{c_i^p} \right)^2}  
$$

where $$ G $$ is the size of some outside grant and $$ p $$ is an index for the open source project. A [calculator for NQF](https://wtfisqf.com/) is available with [source code](https://github.com/anish-agnihotri/quadratic-funding). Note that the funds allocated to project $$p$$ are decreasing in the funds to all other projects. For example, when you donate to WebPack, you are taking funds away from all other projects. This is a major deviation from QF and fundamentally changes its properties.

This reduces contributions from people who have high values for multiple open source projects and does not necessarily even beat private contributions. In fact, we show an example where $$ G $$ is wasted entirely.

**Example** Suppose there are two contributors and two projects. Contributor 1 likes both projects equally while Contributor 2 only likes Project 1. More concretely, assume

$$
v_1^1(x) = v_1^2(x) = v_2^1(x) = 2 \sqrt{x}
$$

while $$ v_2^2(x) = 0 $$. Contributor 1 has no reason to contribute to Project 1 through the mechanism. He will give only to Project 2 such that the grant is split evenly between the two projects. This is despite the fact that Project 1 is more valuable to society. The quadratic nature of this mechanism actually exacerbates the problem because even a small contribution by Player 1 to Project 1 will divert a large amount of funding away from Project 2. Allocations can be found in the table below.

|          | NQF (G = 1)[^6] | Return Grant (G = 0) |
|:---------|:---------------:|:--------------------:|
| Player 1 | (0, 1/2)        | (0, 1)               |
| Player 2 | (1/2, 0)        | (1, 0)               |
| Grant    | (1/2, 1/2)      | (0, 0)               |
| **Total**| **(1, 1)**      | **(1, 1)**           |
| Optimal  | (4, 1)          | (4, 1)               |
{: .center}

The above table shows the contributions to Project 1 and Project 2 by each player and the grants. As you can see, the total contributions are the same between NQF and private contributions. So, in our example, NQF does not outperform private contributions even though a grant has been collected. Of course, both are outperformed by matching contributions or performing QF with any $$ \alpha > 0 $$

This points to a general issue with this mechanism. People who like both popular and unpopular projects have an incentive to divert resources to the unpopular ones. This is a classic voting issue and is exactly the sort of behavior that QF was designed to prevent.

---

[^1]: These assumptions are from the QF paper. VCG doesn't need all of these assumptions.
[^2]: You can subtract any $$h_i(v_{-i})$$ where $$v_{-i} = (v_1, \dots, v_{i-1}, v_{i+1}, \dots, v_n)$$.
[^3]: This ideal function is $$ \max_x \left[ \sum_{j \neq i} v_j( x ) \right] - x $$.
[^4]: As the paper points out, efficiency is lost when people into account how their choices affect their taxes. Though this goes away as the number of participants becomes large. It's hard to see this as an issue if the mechanism played out on a national scale.
[^5]: 'Better' in that it is closer to the efficient allocation
[^6]: The assumption that $$ G=1 $$ isn't terribly important. It does not affect total contributions. Naturally, it's possible to get above $$ (1,1) $$ when $$ G > 2 $$. However, agents give nothing in this case. So, it is not terribly interesting.

*[VCG]: Vickrey-Clarke-Groves (after its three creators)
*[QF]: Quadratic Finance
*[CQF]: Capital-constrained Quadratic Finance
*[NQF]: Not Quadratic Finance
