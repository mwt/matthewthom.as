---
title: "Nonlinear War of Attrition with Complete Information"
author: "Matthew W. Thomas"
layout: "post"
override:tags: ["math", "economics", "game theory", "notes"]
date: "2021-03-22"
use_math: true
description: "Simple derivation of equilibria in a general two player war of attrition"
last_modified_at: "2021-04-18"
pdf: "/assets/pdfs/blog/war-of-attrition-complete-information.pdf"
---

These notes are about nonlinear war of attrition models with two players. The formulation we consider is a simplified version of [Hendricks, Weiss, and Wilson (1988)](https://EconPapers.repec.org/RePEc:ier:iecrev:v:29:y:1988:i:4:p:663-80). These models are popular for modeling conflict that occurs in continuous time including wars, filibusters, bribes, and competition for standards and monopolies.

## Basics

The war of attrition is a second price all-pay auction. That is, an auction where players pay a function of the second highest bid. The story is that two players enter into a battle royal to win some reward. Each moment that they fight, they must pay some cost. Each player chooses a secret time when they will exit the fight and forfeit the prize.

Because the last player wins as soon his opponent exits, the winner only fights until her opponent's exit time. So, both players only face the cost of the lower exit time.

## Model

There are two players, Player 1 and Player 2. Suppose player *i* exits at $t_i$ and the other player exits at $t_{-i}$. Then, the payoff of player *i* is defined by:

$$
U_i( t_i ; t_{-i} ) = 
\begin{cases}
\ell_i(t_i) &\text{ if } t_i < t_{-i} \\
s_i(t_i)    &\text{ if } t_i = t_{-i} \\
f_i(t_{-i}) &\text{ if } t_i > t_{-i}
\end{cases}
$$

where $\ell_i$ is the payoff of losing, $s_i$ is the payoff of a tie, and $f_i$ is the payoff of the winner. Note that the two players can have entirely different payoffs. In the most common formulation, $\ell_i(t) = -t$ and $f_i(t) = V_i - t$.

We make one regularity assumption and another assumption which characterizes the war of attrition.

**Assumption 1:** The function $f_i(t)$ is continuous and $\ell_i(t)$ is continuously differentiable.

**Assumption 2:** Players like to win and war is costly. Specifically,

1. *Winning is better than losing:* $f_i(t) > \ell_i(t)$ for all *t*.
2. *Winning is better than tieing:* $f_i(t) > s_i(t)$ for all *t*.
3. *War is costly when losing:* $\ell'_i(t) < 0$.
4. *Costs are relevant:* $\int_0^\infty \frac{-\ell'_i(z)}{f_i(z) - \ell_i(z)} dz = \infty$.

Without loss of generality, we will say that $\ell_i(0) = 0$. The second assumption guarantees that ties occur with probability zero in equilibrium. So, I will not mention them again. The last point of Assumption 2 prevents pathological behavior around infinity. Without this, it is possible that the players would never exit. It can be interpreted as a guarantee that the benefit of winning is not so large relative to the cost of the war.

## Pure strategy Equilibria

If $\lim_{t \to \infty} f_i(t) < \ell_i(0)$, there are asymmetric pure strategy Nash equilibria where one player, *i*, chooses a very large exit time *t* such that $w_{-i}(t) < 0$. The other player best responds by playing zero because fighting enough to win is not worthwhile. Because the winner's payoff does not depend on her own score, she is indifferent between all actions except zero. So, this is a Nash equilibrium.

## Mixed strategy equilibria

In addition to the pure strategy equilibria, there is one Nash equilibrium in mixed strategies. The equilibrium will have full support over the real line. This is established in several steps.

1. *If one player has a gap in their support, their opponent must have the same gap.* Otherwise, the opponent would move density from the gap to just before it.
2. *There are no gaps in either support.* Otherwise, each player could do better by moving mass from the end of the gap to the beginning.
3. *There are no atoms except at zero.* Otherwise, the opponent would move mass from slightly below the atom to slightly above the atom. This would create a gap.
4. *At most one player has an atom at zero.* Otherwise, one player would prefer to move their atom slightly up.

We will see from the construction of the equilibrium that no player can have an atom and that the support cannot be bounded. However, these four points are enough to get us started.

In order for the player to be willing to mix, they must be indifferent between all points on the support. So, the following indifference condition applies:

$$
P(t_{-i} < t_i) E[ f_i(t_{-i}) \vert t_{-i} < t_i ] + (1 - G_{-i}(t)) \ell_i(t) = u_i
$$

where $u_i$ is the player's (constant) payoff. This is the same as

$$
\int_0^t f_i(x) dG_{-i}(x) + (1 - G_{-i}(t)) \ell_i(t) = u_i
$$

where $G_{-i}$ is the equilibrium strategy distribution of the opponent. We want to solve for $G_{-i}$. If we take derivatives of both sides with respect to $t$, we get

$$
f_i(x) g_{-i}(x) + (1 - G_{-i}(t)) \ell'_i(t) - g_{-i}(t) \ell_i(t) = 0
$$

which simplifies to the following differential equation

$$
- \ell'_i(t) = \left(f_i(t) - \ell_i(t) \right) \frac{g_{-i}(t)}{1 - G_{-i}(t)}.
$$

This equation ensures that the marginal cost of participating in the war of attrition is equal to the prize value times the rate that your opponent exits (hazard rate). So, we are equating marginal cost with marginal benefit.

The differential equation has a known solution:

$$
G_{-i}(t) = 1 - \exp \left( \int _0^t \frac{ \ell'_i(z) }{ f_i(z) - \ell_i(z) } dz \right).
$$

One might be concerned that the above expression may not satisfy the properties of a distribution function. For example, it may be decreasing or $\lim_{t \to \infty} G_{-i}(t) \neq 1$. This is not the case. The function is strictly increasing because the term inside the integral is negative. Assumption 2.4 guarantees that the distribution approaches one. However, it never reaches one at any time. So, the support is unbounded. Another way to see this is to note that the survival function is

$$
S_{-i}(t) = \exp \left( \int _0^t \frac{ \ell'_i(z) }{ f_i(z) - \ell_i(z) } dz \right) > 0.
$$

The solution is somewhat difficult to work with. So, in most applications, the prize is taken to be fixed. 

### Assuming fixed prizes

If we assume $f_i(z) = V_i + \ell_i(y)$, where $V_i$ is a constant prize, then 

So, the strategy reduces to
$$
\begin{aligned}
G_{-i}(t) &= 1 - \exp \left( \int _0^t \frac{ \ell'_i(z) }{ f_i(z) - \ell_i(z) } dz \right) \\
          &= 1 - \exp \left( \int _0^t \frac{ \ell'_i(z) }{ V_i } dz \right) \\
          &= 1 - \exp \left( \frac{ \ell_i(t) }{ V_i } \right).
\end{aligned}
$$

This equation is about as simple as the equilibrium of the linear war of attrition (where $\ell_i(x) = -x$). So, it is pretty popular. You can try other assumptions in the general equation to to get other expressions. For example, the equilibrium where players only pay a fraction of $\ell_i$ when they win is also relatively simple.

