---
title: "Minimum Wages Salaries Under Oligopsony"
author: "Matthew Wildrick Thomas"
layout: "post"
tag: ["math", "economics", "notes"]
date: "2021-10-02"
use_math: true
last_modified_at: "2021-10-02"
description: ""
---

It is well known that when perfectly competitive firms contract with a worker, a minimum wage can only hurt both employees and employers by generating unemployment. However, a minimum wage can help workers when there is only one employer (i.e. the monopsonist case) without lowering employment or welfare. In both cases, this is because any binding minimum wage increases wages and wages can be increased in the monopsonist case without generating unemployment. The main argument in favor of the minimum wage is that employers have market power, and thus reality is close to the monopsony case. By this logic, any small, binding minimum wage is welfare improving.

However, no one argues that firms in the real world are literally monopsonists. Real labor markets typically lie somewhere in between the extremes of monopsony and perfect competition. However, this intermediate case, oligopsony is understudied in labor. I demonstrate that in this case, a minimum wage can actually decrease the equilibrium wage and/or increase profits.


## Model

Consider the following model. There are $$N$$ identical firms evenly spaced on a circle. Firms are indexed clockwise starting from Firm 1. Each firm contracts with identical employees who are uniformly distributed about the circle. These employees prefer to work with nearby employers. The utility of a worker who receives a salary (i.e. lump sum transfer) of $$\tau$$ and has to work for $$\ell$$ units of time at a firm $$d$$ units away is

$$
    \tau - c(\ell; d)
$$

where $$c$$ has the single crossing property, is increasing in both arguments, and is convex in $$\ell$$. Naturally, $$c(0, d) = 0$$ for all $$d$$. The per worker profit of each firm from working with an employee is

$$
    f(\ell) - \tau.
$$

The *complete information* game has two stages:

1. The firms simultaneously announce individual contracts to each employee. These contracts are a tuple $$(\ell, \tau)$$.
2. Given the offered contracts, the employees chooses whether to accept an offer and, if so, which one. For simplicity, I assume that if the employee is indifferent between two contracts, she always chooses the one from the closer firm. Any equidistant employee chooses the clockwise firm.

Note that the firms are effectively in Bertrand competition where they must offer the agent at least as much utility as their competitor in order to receive any profit.


## Basic interpretation

By symmetry, we can restrict attention to employees that are closest to Firm 1. We say that Firm 1 is located at $$\frac{1}{2N}$$. Therefore, the employees that are closest to Firm 1 are those on the interval $$\left[ 0,\frac{1}{N} \right)$$. These firms distance, $$d$$, from Firm 1 is distributed uniformly on $$\left[ 0,\frac{1}{2N} \right)$$.

Firms 2 and $$N$$ (which could be the same) cannot contract with the agents on this interval in equilibrium because any such contract would be weakly profitable for Firm 1 to match. As a result, these local competitors will always offer the agent a utility maximizing contract subject to a zero profit constraint and all legally mandated constraints. Moreover, by symmetry, no firm outside of this interval will contract with Firm 1 because it is closest to some other identical firm.


## Base case: no minimum wage

If there is no minimum wage, then for an employee of distance $$d$$ from Firm 1, the local competitor, who we call Firm 2, solves the following problem:

$$
    \max_{\tau_2, \ell_2} \tau_2 - c\left( \ell_2; \frac{1}{N} - d \right)
$$

subject to

$$
    \tau_2 \leq f(\ell_2).
$$

Obviously, this constraint is always binding. When we write the Lagrangian, the first order condition for the lump-sum transfer reveals that the multiplier on the constraint is one. Therefore, Firm 2 offers a contract that satisfies:

$$
    f'(\ell_2^\star(d)) = c' \left(\ell_2^\star(d); \frac{1}{N} - d \right)
$$

$$
    \tau_2^\star(d) = f(\ell_2^\star(d)).
$$

where the first line defines the efficient number of hours when the employee works for Firm 2 and the second line is the zero profit condition. Single crossing guarantees that $$\ell_2^\star$$ is an increasing function of the distance from Firm 1. Monotonicity of $$f$$ then guarantees the same for $$\tau_2^\star$$. Of course, even without single crossing, we that the employees utility from the contract,

$$
\begin{aligned}
    u_2(d) &= \tau_2^\star(d) - c\left(\ell_2^\star(d) ; \frac{1}{N} - d \right) \\
           &= f(\ell_2^\star(d)) - c\left(\ell_2^\star(d) ; \frac{1}{N} - d \right),
\end{aligned}
$$

is increasing. Given this, Firm 1 solves

$$
    \max_{\tau_1, \ell_1} f(\ell_1) - \tau_1
$$

subject to

$$
    \tau_1 - c(\ell_1; d) \geq u_2(d)
$$

where $$u_2(d) = f(\ell_2^\star(d)) - c\left(\ell_2^\star(d); \frac{1}{N} - d \right)$$. The existence of the lump sum transfer once again guarantees that the constraint binds. Therefore, Firm 1 will offer an efficient contract, but will have a positive profit for almost every worker. That is,

$$
    f'(\ell_1^\star(d)) = c'\left(\ell_1^\star(d); d \right)
$$

$$
    \tau_1^\star = f(\ell_2^\star(d)) + \left[ c\left(\ell_1^\star(d); d \right) - c\left(\ell_2^\star(d); \frac{1}{N} - d \right) \right].
$$


## Minimum salary

We now impose a minimum lump sum transfer of $$\tau_i \geq \bar{\tau}$$ for all $$i$$. This minimum does not significantly complicate the problem. It does not really make sense because it creates a perverse incentive for the firms to require an arbitrarily large amount of work. Firm 2 solves the following problem:

$$
    \max_{\tau_2, \ell_2} \tau_2 - c(\ell_2)
$$

subject to

$$
    \tau_2 \leq \delta f(\ell_2) \text{ and } \tau_2 \geq \bar{\tau}.
$$

When $$\tau_2 \leq \tau_2^\star$$, the minimum does not bind and there is no effect on Firm 2's contract. If the minimum salary does bind, then

$$
    \delta f(\ell_2) =\bar{\tau}
$$

so long as $$\bar{\tau} > c(\ell_2)$$. Otherwise, Firm 2 shuts down. What matters is that $$u_2$$ is decreasing in $$\bar{\tau}$$. This will have two opposite effects on the equilibrium wage for Firm 1. Firm 1 solves

$$
    \max_{\tau_1, \ell_1} f(\ell_1) - \tau_1
$$

subject to

$$
    \tau_1 - c(\ell_1) \geq u_2 \text{ and } \tau_1 \geq \bar{\tau}
$$

This minimum salary has an unambiguously negative effect on welfare because the first constraint *always* binds. To see this, note that the objective function is strictly increasing in $$\ell$$. So, when the minimum salary constraint binds, the first constraint must bind as well. Therefore, the surplus provided to the agent by Firm 1 is $$u_2$$ which we established is initially constant in $$\bar{\tau}$$, then is strictly decreasing until it hits zero.


## Minimum wage

We now impose a minimum wage that is proportional to the amount of time worked. That is, we require $$\tau \geq \bar{w} \ell$$. The effects of this 

