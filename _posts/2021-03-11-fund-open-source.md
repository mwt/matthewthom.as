---
title: "Mechanisms to Fund Open Source"
author: "Matthew W. Thomas"
layout: "post"
override:tags: ["math", "economics", "mechanism design", "notes"]
date: "2021-03-11"
use_math: true
description: "Notes on VCG and issues with current applications of quadratic voting"
last_modified_at: "2021-04-18"
---

I recently came across [a paper](https://econpapers.repec.org/RePEc:inm:ormnsc:v:65:y:2019:i:11:p:5171-5187) published in Management Science that proposes Quadratic Finance (QF), a a quadratic voting mechanism to allocate funds to public goods such as open source software. This has generated an understandable amount of excitement and there are already several cases in which it has been implemented.

* [FundOSS](https://fundoss.org/)
* [Gitcoin Grants](https://gitcoin.co/grants/)
* [Downtown Stimulus](https://downtownstimulus.com/)
* [clr.fund](https://clr.fund/)

This mechanism has also been referred to as [Liberal Radicalism](https://scholar.archive.org/search?q=key:work_owdeblsi4vcerjx7h6wq6vnevq) or LR.

I wanted to take the time to clarify a few common misconceptions about QF and explain what it actually is and is not. Moreover, implementations of QF have modified the mechanism in ways that are not efficient and often dominated by more common allocation approaches.

The basic problem with funding a public good is that people do not pay if they can take advantage of the good for free. So, collected payments/donations are always less than they should be. This is not a problem that QF solves. Several sources claim QF is "the mathematically optimal way to fund public goods in a democratic community" [(Gitcoin)](https://wtfisqf.com/). This is not entirely true. QF was not designed to solve the problem of *funding* public goods. It is not a mechanism for optimal fundraising. It was instead designed to solve the following problem:

> How can we efficiently allocate resources to public goods given that we have *unlimited* access to resources.

Note that this is not a fundraising problem. It is a *voting* problem. QF was not designed to have the greatest revenue of any mechanism. It doesn't tell you how to raise money. It instead tells you where you should put it once it is raised. QF is a system where people "vote with their wallets" to allocate resources. Yes, it raises funds as part of the process, but this is not the point.

This is a classic Economic problem that was technically solved by Vickrey, Clarke, and Groves in [three](https://econpapers.repec.org/RePEc:bla:jfinan:v:16:y:1961:i:1:p:8-37) [separate](https://econpapers.repec.org/RePEc:kap:pubcho:v:11:y:1971:i:1:p:17-33) [papers](https://econpapers.repec.org/RePEc:ecm:emetrp:v:41:y:1973:i:4:p:617-31). A quick summary of their mechanism (VCG) is essential for understanding what QF is about.

## Classic VCG

The idea behind VCG is pretty simple. Suppose we are looking at [funding webpack](https://opencollective.com/webpack), a popular open source project. Suppose the value for person $$i$$ of webpack having an annual budget of $$x$$ is $$ v_i(x) $$ where $$ v_i $$ is a concave, differentiable, and increasing function[^1] with $$ v_i(0) \equiv 0 $$. The efficient level of funding for webpack is the $$ x^\star $$ that maximizes society's payoff:

$$
\left[ \sum_{i} v_i(x) \right] - x. \tag{1}
$$

However, people only care about their own value -- not the value of others. So, they would not be willing to give as much. To fix this, we conduct a three step process.

1. Ask everyone for their $$v_i(x)$$.
2. Find the $$x^\star$$ that maximizes equation 1.
3. Give each agent a (possibly negative) transfer of $$ \left[ \sum_{j \neq i} v_j( x^\star ) \right] - x^\star $$.

When they add their own $$v_i(x)$$ to the transfer, their personal payoff is exactly the same as society's (Equation 1). Because of this, they want $$x^\star$$ to be calculated correctly. So, they have no reason to lie about their value, $$v_i$$.

The transfers noted above are very expensive. However, they can be made much cheaper because you can subtract any constant from these transfers. In fact, you can subtract any function that does not depend on $$v_i$$.[^2] When the ideal function is chosen,[^3] the assumptions we made ensure the VCG mechanism raises funds from each person. The amount raised from person $$i$$ is.

$$
\max_x \left( \left[ \sum_{j \neq i} v_j( x ) \right] - x \right) - \left( \left[ \sum_{j \neq i} v_j( x^\star ) \right] - x^\star \right) > 0
$$

There is no incentive compatible efficient mechanism that raises more total funds [(Krishna and Perry 1998)](https://econpapers.repec.org/RePEc:wpa:wuwpga:9703010).

### Issues

There are two major issues with the VCG mechanism:

1. It requires too much information
2. It fails if bidders can work together (i.e. collude)
3. It can raise less than $$ x^\star $$ and thus requires subsidization

VCG requires each participant to submit their exact valuation for each level of total funding for every open source project. This imposes a preparation cost for most participants as they likely do not know these valuations offhand. Issue 2 is somewhat overblown as the ways to cheat in VCG are generally NP-hard to compute. However, there are interesting restricted cases where the optimal collusion scheme can be computed in polynomial time.

The third issue is an important one that cannot be easily solved. Remember that there is no incentive compatible efficient mechanism that collects more revenue than VCG. So, collecting more funds requires sacrificing efficiency -- an issue not dealt with here.

## Quadratic finance

The aforementioned paper considers QF, a different allocation mechanism which solves the first issue with VCG (i.e. that it requires too much information) and it solves this brilliantly.

The QF mechanism allocates resources according to

$$
x^\star = \left( \sum_i \sqrt{c_i} \right)^2 \tag{2}
$$

where $$ c_i $$ is an individual contribution made by each participant. So, participants no longer need to send their value for every level of funding. They just need to choose a contribution. This requires less information on the part of the contributors. It is also more private because less information is surrendered. The main point of the paper is that, in equilibrium, this $$ x^\star $$ is the same as the one we considered in the VCG section.

The goal of QF is not to maximize $$ \sum_i c_i $$, but to instead find a function that achieves the socially optimal resource allocation, $$ x^\star $$.

The deficit of QR is

$$
D_{QF} = x^\star - \sum_i c_i = \left( \sum_i \sqrt{c_i} \right)^2 - \sum_i c_i
$$

which is positive when there is more than one contributor by [Jensen's inequality](https://en.wikipedia.org/wiki/Jensen%27s_inequality). Therefore, outside funding is always required for QR. 

### Issues

The issues with QF are similar to VCG.

1. It fails if bidders can work together (i.e. collude)
2. There is always a deficit and it is typically larger than with VCG

Collusion in QF is particularly easy. If you want to contribute $$ c_i $$ and have friends who want to contribute nothing, then you can do better by contributing less and dividing your contributions amongst your friends. 

The second problem is a big problem for applying both QF and VCG because the deficit is can be difficult to predict. Therefore, unlimited resources are needed guarantee that the costs are covered. This is somewhat reasonable for governments who can tax their citizens.[^4]

It is not reasonable when the funds are raised by a foundation or philanthropist. What do you do if $$D_{QF}$$ is larger than your grant funding, $$G$$? However, the authors note this problem and propose an approximate solution called CQF (also known as CLR)

$$
x^\circ = \alpha \left( \sum_i \sqrt{c_i} \right)^2 + (1 - \alpha) \sum_i c_i
$$

where $$ 0 \leq \alpha \leq 1 $$. When $$ \alpha = 0 $$, CQF is the standard donation model with no subsidies. When $$ \alpha = 1 $$, CQF is the same as QF and thus achieves the optimal allocation. At every $$ \alpha $$ in between, CQF is a mix of the two. The deficit of CQF is

$$
D_{CQF} = x^\circ - \sum_i c_i = \alpha D_{QF}.
$$

So, CQF has a smaller deficit than QF. It results in a better[^5] allocation than private donations. However, CQF does not yield the efficient allocation unless $$ \alpha = 1 $$.

## Implementations

Implementations of QF have not actually implemented QF or CQF. They have instead implemented the following rule which I call NQF:

$$
\tilde{x}^p = \left[ \sum_i c_i^p \right] + G \frac{\left( \sum_i \sqrt{c_i^p} \right)^2}{ \sum_p \left( \sum_i \sqrt{c_i^p} \right)^2}  
$$

where $$ G $$ is the size of an outside grant and $$ p $$ is an index for the open source project. A [calculator for NQF](https://wtfisqf.com/) is available with [source code](https://github.com/anish-agnihotri/quadratic-funding). This formulation guarantees that the deficit of the mechanism is exactly $$ D_{NQF} = G $$. This is a desirable property because it ensures that the round never goes over budget and that all of $$ G $$ is used. However, this model is not ideal. In the next section, I'll show a better way.

**NQF lacks the desirable properties of QF and CQF.** It not not efficient. It is a completely different mechanism.

The first thing to note is that a private good still gets a subsidy under NQF. Under VCG, QF, and CQF, any project with one contributor gets no subsidy. You can see in the equation above that this is not true for NQF because the subsidy for each project

$$
G \frac{\left( \sum_i \sqrt{c_i^p} \right)^2}{ \sum_p \left( \sum_i \sqrt{c_i^p} \right)^2}
$$

is always positive. This means that any individual who can list a project can fraudulently profit from the mechanism. 

The second thing to note about NQF is funds allocated to project $$p$$ are decreasing in the contributions to all other projects. For example, when you donate to WebPack, you are taking funds away from all other projects. This generates inefficiency and is a major deviation from QF and CQF.

NQF does not necessarily beat private contributions. In fact, we show an example where $$ G $$ is wasted entirely.

**Example:** Suppose there are two contributors and two projects. Contributor 1 likes both projects equally while Contributor 2 only likes Project 1. More concretely, assume

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

The above table shows the contributions to Project 1 and Project 2 by each player and the grants. As you can see, the total contributions are the same between NQF and private contributions. So, in our example, NQF does not outperform private contributions even though a grant has been collected. Of course, both are outperformed by matching contributions or performing QF with any $$ \alpha > 0 $$.

This points to a general issue with this mechanism. People who like both popular and unpopular projects have an incentive to divert resources to the unpopular ones. This is a classic voting issue and is exactly the sort of behavior that quadratic voting mechanisms were designed to prevent.

## A better way

NQF has the nice property that the deficit is exactly equal to your grant funding. So you can never generate more deficit than you have funding for. However, it lacks all other nice properties of QF or CQF. It does not result in an approximately efficient allocation and it can be defrauded by a single agent. However, it is possible to get the one advantage of NQF ($$ D = G $$) without losing any of these properties. You just have to stop the mechanism when $$ D = G $$.

That is:

1. Run QF or CQF with your preferred choice of $$ \alpha $$.
2. Compute your deficit $$ D $$ after every donation.
3. End the donation matching once $$ D = G $$.

This last step could be achieved by cutting off donations completely or by putting a "donation matching is currently disabled" message on the screens of potential donors. The choice of $$ \alpha $$ would determine how long you can run the match.

---

[^1]: These assumptions are from the QF/LR papers. VCG doesn't need all of these assumptions.
[^2]: You can subtract any $$h_i(v_{-i})$$ where $$v_{-i} = (v_1, \dots, v_{i-1}, v_{i+1}, \dots, v_n)$$.
[^3]: This ideal function is $$ \max_x \left[ \sum_{j \neq i} v_j( x ) \right] - x $$.
[^4]: As the paper points out, efficiency is lost when people consider how their choices affect their taxes. Though this goes away as the number of participants becomes large. It's hard to see this as an issue if the mechanism played out on a national scale.
[^5]: 'Better' in that it is closer to the efficient allocation
[^6]: The assumption that $$ G=1 $$ isn't terribly important. It does not affect total contributions. Naturally, it's possible to get above $$ (1,1) $$ when $$ G > 2 $$. However, contributors give nothing in this case. So, it is not terribly interesting.

*[VCG]: Vickrey-Clarke-Groves (after its three creators)
*[QF]: Quadratic Finance
*[LR]: Liberal Radicalism
*[CQF]: Capital-constrained Quadratic Finance
*[CLR]: Capital-constrained Liberal Radicalism
*[NQF]: Not Quadratic Finance
