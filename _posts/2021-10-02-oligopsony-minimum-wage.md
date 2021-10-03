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

Consider the following model. There are two firms, Firm 0 and Firm 1, located at their respective points on an interval $[0,1]$. The interval contains a continuum of uniformly distributed employees who can contract with one of the firms. The employees prefer to work with nearby employers. The utility of a worker who receives a salary (i.e. lump sum transfer) of $$\tau$$ and has to work for $$\ell$$ units of time at a firm $$d$$ units away is

$$
    \tau - c(\ell; d)
$$

where $$c$$ has the single crossing property, is increasing in both arguments, and is convex in $$\ell.$$ Naturally, $$c(0, d) = 0$$ for all $$d.$$ The per worker profit of Firm $$i$$ from working with an employee is

$$
    f_i(\ell) - \tau
$$

where we assume that $$f_i$$ is concave and increasing with $$f_i(0)=0$$ and $$f_0(x) \geq f_1(x)$$ for all $$x.$$ The *complete information* game has two stages:

1. The firms simultaneously announce individual contracts to each employee. These contracts are a tuple $$(\ell, \tau).$$
2. Given the offered contracts, the employees chooses whether to accept an offer and, if so, which one. For simplicity, I assume that if the employee is indifferent between two contracts, she always chooses the Firm that profits most from hiring her. If these profits are the same, she chooses Firm 0.

Note that the firms are effectively in Bertrand competition where they must offer the agent at least as much utility as their competitor in order to receive any profit.


## Basic interpretation

Firm 1 cannot contract with any employee, $$x \in [0,1]$$ such that

$$
    \max_\ell f_0(\ell) - c(\ell; x) \geq \max_\ell f_1(\ell) - c(\ell; 1 - x)
$$

in equilibrium because any such contract would be weakly profitable for Firm 1 to match (in terms of utility to the agent). As a result, Firm 1 will always offer the agent a utility maximizing contract subject to a zero profit constraint and all legally mandated constraints. 


## Base case: no minimum wage

**Proposition:** When there is no minimum wage, the efficient quantity of labor is provided and it is always provided to the most efficient firm for that worker. Welfare is strictly increasing in distance from employer The unemployed workers are those for whom work is inefficient.

<div class="proof" markdown=1>
Consider the employees who work for Firm 0. The employees of Firm 1 are similar. If there is no minimum wage, then for any employee at position $$x$$ such that

$$
    \max_\ell f_0(\ell) - c(\ell; x) \geq \max_\ell f_1(\ell) - c(\ell; 1 - x)
$$

Firm 1 solves the following problem:

$$
    \max_{\tau_1, \ell_1} \tau_1 - c\left( \ell_1; 1 - x \right)
$$

subject to a zero profit constraint

$$
    \tau_1 \leq f_1(\ell_1).
$$

Obviously, this constraint is always binding. When we write the Lagrangian, the first order condition for the lump-sum transfer reveals that the multiplier on the constraint is one. Therefore, Firm 1 offers a contract that satisfies:

$$
    f'(\ell_1^\star(x)) = c' \left(\ell_1^\star(x); 1-x \right)
$$

$$
    \tau_1^\star(x) = f_1(\ell_1^\star(x)).
$$

where the first line defines the efficient number of hours when the employee works for Firm 1 and the second line is the zero profit condition. Single crossing guarantees that $$\ell_1^\star$$ is an increasing function of the distance from Firm 0. Monotonicity of $$f$$ then guarantees the same for $$\tau_1^\star.$$ Of course, even without single crossing, we that the employees utility from the contract,

$$
\begin{aligned}
    u_1(x) &= \tau_1^\star(x) - c\left(\ell_1^\star(x) ; 1-x \right) \\
           &= f_1(\ell_1^\star(x)) - c\left(\ell_1^\star(x) ; 1-x \right),
\end{aligned}
$$

is increasing. Given this, Firm 1 solves

$$
    \max_{\tau_0, \ell_0} f_1(\ell_0) - \tau_0
$$

subject to

$$
    \tau_0 - c(\ell_0; x) \geq u_1(x).
$$

The existence of the lump sum transfer once again guarantees that the constraint binds. Therefore, Firm 0 will offer an efficient contract, but will have a positive profit for almost every worker. That is,

$$
    f'_0(\ell_0^\star(x)) = c'\left(\ell_0^\star(x); x \right)
$$

$$
    \tau_0^\star = f_1(\ell_1^\star(x)) + \left[ c\left(\ell_0^\star(x); x \right) - c\left(\ell_1^\star(x); 1 - x \right) \right].
$$

</div>


## Minimum wage

We now impose a minimum wage that is proportional to the amount of time worked. That is, we require $$\tau \geq \bar{w} \ell.$$

<div class="proof" markdown=1>
Consider the employees who work for Firm 0. The employees of Firm 1 are similar. Then for any employee at position $$x$$ such that

$$
    \max_\ell f_0(\ell) - c(\ell; x) \geq \max_\ell f_1(\ell) - c(\ell; 1 - x)
$$

Firm 1 solves the following problem:

$$
    \max_{\tau_1, \ell_1} \tau_1 - c\left( \ell_1; 1 - x \right)
$$

subject to a zero profit constraint and the minimum wage constraint

$$
    \tau_1 \leq f_1(\ell_1) \text{ and } \tau_1 \geq \bar{w} \ell.
$$

Obviously, the minimum wage cannot increase the employee's utility from a Firm 1 contract as adding a constraint cannot increase the maximum. The minimum wage is binding when it exceeds the output under the efficient level of production for Firm 2, $$f_1(\ell_1^\star(x))$$. Increasing a binding minimum wage causes $$\ell_1$$ to decrease until the firm chooses not to offer a contract to the employee, which occurs iff $$f'_1(0) < \bar{w}$$.

Given this, Firm 1 solves

$$
    \max_{\tau_0, \ell_0} f_1(\ell_0) - \tau_0
$$

subject to

$$
    \tau_0 - c(\ell_0; x) \geq u_1(x | \bar{w}) \text{ and } \tau_0 \geq \bar{w} \ell.
$$

</div>


## More firms

Consider the following model. There are $$N$$ identical firms evenly spaced on a circle. Firms are indexed clockwise starting from Firm 1. Each firm contracts with identical employees who are uniformly distributed about the circle. These employees prefer to work with nearby employers.

By symmetry, we can restrict attention to employees that are closest to Firm 1. We say that Firm 1 is located at $$\frac{1}{2N}.$$ Therefore, the employees that are closest to Firm 1 are those on the interval $$\left[ 0,\frac{1}{N} \right).$$ These firms distance, $$d$$, from Firm 1 is distributed uniformly on $$\left[ 0,\frac{1}{2N} \right).$$
