---
title: "Tullock Lottery Contests with Direct and Covert Discrimination"
author: "Matthew Wildrick Thomas"
layout: "post"
tag: ["math", "economics", "game theory"]
date: "2021-04-15"
use_math: true
last_modified_at: "2021-04-15"
---

These notes summarize concepts introduced in [Nti (1999)](https://econpapers.repec.org/RePEc:kap:pubcho:v:98:y:1999:i:3-4:p:415-30), [Fang (2002)](https://econpapers.repec.org/RePEc:kap:pubcho:v:112:y:2002:i:3-4:p:351-71), [Nti (2004)](https://econpapers.repec.org/RePEc:eee:poleco:v:20:y:2004:i:4:p:1059-1066), and [Epstein et al (2013)](https://econpapers.repec.org/RePEc:iza:izadps:dp7032) about revenue maximization in Tullock lottery contests.


## Introduction

Contests are models of conflict where risk neutral players exert costly effort to win a prize. A *lottery contest* is any contest where there is not a deterministic relationship between effort and victory. For example, scores could be measured incorrectly or there could be some randomness in the relationship between effort and the final scores. Alternatively, you can interpret lottery contests as giving each player a slice of a prize. For example, a 5% probability of receiving the prize is the same as receiving 5% of the prize with certainty.

The most popular lottery contest is the Tullock contest.[^t] We discuss ways to increase competitiveness in Tullock contests by discriminating against the stronger player. Handicaps in sporting events are a real world example of such discrimination. The purpose of a handicap is to make a match more even so that both teams/players exert more effort.


## Model

Suppose that the prize of contest is worth one to both players. So, the two players have the same value. However, their scores have different costs. In particular, we will say that the score is $$k > 1$$ times more costly for Player 2 than for Player 1.[^d] You can interpret this as saying that Player 1 is more skilled. So, it takes less effort for her to produce a high score.

The probability of Player 1 winning the prize in a Tullock contest when she chooses score $$s_1$$ and her opponent chooses score $$s_2$$ is:

$$
p_1(s_1, s_2) = \frac{s_1^{\alpha}}{s_1^{\alpha} +  (\delta s_2)^{\alpha} }.
$$

The parameter $$ \delta $$ sets the level (and direction) of direct discrimination. If $$\delta = 0$$, then Player 1 always wins. If $$\delta = \infty$$, then Player 2 always wins. In general, $$\delta > 1$$ implies discrimination against Player 1. Note that the prize is symmetric when $$ \delta = 1 $$. In this case, there is no direct discrimination.

The other parameter, $$ \alpha $$, is more subtle. It affects the variance of the lottery in the contest. If $$ \alpha \to \infty $$, the prize always goes to the player with the higher score.[^apa] If $$ \alpha = 0 $$, the prize is allocated at random. This *precision parameter* changes the marginal returns to effort at different levels. For example, if $$ \alpha < 1 $$, then the lower effort player gets a disproportionately high return. While such a contest is fair, in the sense that the two players are not treated differently, it is actually rigged in favor of the weaker player.

The final payoffs are:

$$
U_1(s_1, s_2) = \frac{s_1^{\alpha}}{s_1^{\alpha} +  (\delta s_2)^{\alpha} } - s_1
$$

$$
U_2(s_1, s_2) = \frac{(\delta s_2)^{\alpha}}{s_1^{\alpha} +  (\delta s_2)^{\alpha} } - k s_2
$$

### Assumptions

We consider pairs $$ \alpha, \delta $$ such that the following two conditions are satisfied.

1. *No reversal:* $$ \delta \leq k $$
2. *Pure strategy equilibrium:* $$ \left( \frac{\delta}{k} \right)^{\alpha} \geq \alpha - 1 $$

The first assumption prevents excessive discrimination against Player 1 and is without loss of optimality. This is made for simplicity. Without it, we would have to consider more cases.

The second assumption is more important. It is a necessary and sufficient condition for there to be an equilibrium in pure strategies. It is always satisfied if $$ \alpha \leq 1 $$ and is never satisfied if $$ \alpha > 2 $$. The condition is equivalent to 

$$
\alpha \leq \bar{\alpha}(\delta/k) = 1 - \frac{W \left( - (\delta/k) \log{\left( \delta/k \right)} \right)}{\log{\left( \delta/k \right)}}
$$

where $$ W $$ is the Lambert *W* function. The upper bound, $$ \bar{\alpha} $$ is a strictly increasing function.

![plot of upper alpha upper bound](/assets/images/posts/2021/tullock-maximum-alpha.svg){: width="600px"}
{: .text-center}


## Equilibrium

To find the Nash equilibrium, we need to find the best response functions for each of the players. We do this by maximizing each payoff function. Player 1's first order condition is

$$
\frac{\alpha  s_1^{\alpha} (\delta  s_2)^{\alpha}}{s_1 \left(s_1^{\alpha}+(\delta  s_2)^{\alpha}\right)^2} = 1
$$

and Player 2's first order condition is

$$
\frac{\alpha  s_1^{\alpha } (\delta  s_2)^{\alpha}}{s_2 \left(s_1^{\alpha}+(\delta  s_2)^{\alpha}\right)^2} = k.
$$

This is a system of two equations with two unknowns. Dividing the second by the first gives us $$ k = \frac{s_1^{\star}}{s_2^{\star}} $$. So the ratio of the scores does not depend on the discrimination parameters. Thus, any change that increases one also increases the other. With this, we can quickly solve the system of equations to get $$ s_1^{\star} = \frac{\alpha  (k \delta)^{\alpha} }{\left( k^{\alpha}+\delta^{\alpha} \right)^2} $$ and $$ s_2^{\star} = \frac{\alpha  (k \delta)^{\alpha} }{k \left( k^{\alpha}+\delta^{\alpha} \right)^2} $$.

In order for the first order approach to be valid, we have to check the second order and boundary conditions. 

**The second order conditions** require the second derivative of the payoffs to be negative at the equilibrium. They are satisfied if and only if $$ \left( \frac{k}{\delta} \right)^{\alpha} > \frac{\alpha - 1}{\alpha + 1} $$. This inequality holds by Assumption 1.

**The boundary conditions** require that payoffs are non-negative at the proposed equilibrium. Otherwise, the player would prefer to chose a score of zero. Using $$ k = \frac{s_1^{\star}}{s_2^{\star}} $$, we can dramatically simplify the equilibrium payoffs:

$$
U_1(s_1^{\star}, s_2^{\star}) = \frac{k^{\alpha}}{k^{\alpha} + \delta^{\alpha}} - s_1^{\star}
$$

$$
U_2(s_1^{\star}, s_2^{\star}) = \frac{\delta^{\alpha}}{k^{\alpha} + \delta^{\alpha}} - s_1^{\star}.
$$

By Assumption 1, $$ U_2(s_1^{\star}, s_2^{\star}) \leq U_1(s_1^{\star}, s_2^{\star}) $$. So, we only need a condition such that Player 2 has a positive payoff. Substituting $$ s_1^{\star} = \frac{\alpha  (k \delta)^{\alpha} }{\left( k^{\alpha}+\delta^{\alpha} \right)^2} $$ gives our lowest payoff

$$
U_2(s_1^{\star}, s_2^{\star}) = \frac{\delta^{\alpha}}{k^{\alpha} + \delta^{\alpha}} - \frac{\alpha  (k \delta)^{\alpha} }{\left( k^{\alpha}+\delta^{\alpha} \right)^2}.
$$

It's not obvious that this is non-negative by Assumption 2. However, it just requires some factoring.


## Contest design

Suppose that there is some contest designer who can choose $$ \alpha $$ and/or $$ \delta $$ in order to maximize the revenue, $$ s_1 + s_2 $$. Because we know that $$ k = \frac{s_1}{s_2} $$, we are actually trying to maximize $$ (1 + k^{-1}) s_1 $$. Because $$ k $$ is constant, maximizing $$ s_1 $$ is enough.

### Direct discrimination

Suppose $$ \alpha $$ is fixed. For now, assume it is one. To maximize revenue, we need to maximize $$s_1$$. Suppose that we can directly discriminate using $$ \delta $$. Then, our problem is

$$
\max_{\delta}  \frac{k \delta}{( k + \delta )^2}.
$$

This maximum is obtained at $$ \delta^\star = k $$.

![plot of s1 that we maximize for delta](/assets/images/posts/2021/tullock-direct-discrimination.svg){: width="600px"}
{: .text-center}

In this case, the revenue is

<div markdown="false">
\begin{align*}
s_1 + s_2 &= \left( 1 + \frac{1}{k} \right) s_1 \\
          &= \left( 1 + \frac{1}{k} \right) \frac{k^2}{( 2 k )^2} \\
          &= \frac{1 + k}{4 k}
\end{align*}
</div>

If we allow $$ \alpha $$ to take any positive value, then the optimal delta will still be $$ \delta^\star = k $$. This result comes from the optimization problem

$$
\max_{\delta}  \frac{\alpha  (k \delta)^{\alpha} }{\left( k^{\alpha}+\delta^{\alpha} \right)^2}
$$

which has the following first order condition:

$$
\frac{\alpha^2 ( \delta k)^{\alpha} ( k^{\alpha} - \delta^{\alpha} )}{ \delta ( k^{\alpha} + \delta^{\alpha} )^3 } = 0.
$$

### Covert discrimination

Suppose that the contest designer cannot discriminate directly. So $$ \delta = 1 $$, and the designer chooses $$ \alpha $$ in order to maximize the revenue of the contest. Then, our problem is

$$
\max_{\alpha}  \frac{\alpha k^{\alpha}}{( 1 + k^\alpha )^2}.
$$

If we take first order conditions and solve, we get

$$
\alpha = \frac{1}{\log(k)} \left( 1 - \frac{2}{1 + k^{\alpha}} \right)^{-1}
$$

which defines implicit function $$ \alpha^\star(k) $$. However, these values cannot be attained unless $$ k $$ is sufficiently large. Recall that there is no pure strategy equilibrium if $$ \alpha > \bar{\alpha} $$. So, there is no way to reach some of these values.

![plot of s1 that we maximize for alpha](/assets/images/posts/2021/tullock-covert-discrimination.svg){: width="600px"}
{: .text-center}

If you set up a Lagrangian as in Proposition 3 of [Nti (2004)](https://econpapers.repec.org/RePEc:eee:poleco:v:20:y:2004:i:4:p:1059-1066), then you find that the constrained optimum is the minimum of the two pictured curves. No exact representation of the intersection is known. However, it is approximately $$ k = 3.509 $$.

### Overall optimum

We know that if both forms of discrimination are allowed, then $$ \delta^\star = k $$ because this is the optimum for any $$ \alpha $$. As you can see in the first plot, this means that $$ \bar{\alpha} = 2 $$. We will show that this is also the constrained optimum. Our optimization problem is

$$
\max_{\alpha \leq 2} \frac{\alpha}{4}
$$

which is obviously attained at $$ \alpha = 2 $$.


## Conclusion

This table summarizes the results that we have about each type of optimal contest. There is not much to summarize for covert discrimination because there aren't any closed form expressions.

|                           |$$\alpha,\delta$$| Payoffs                                    | Revenue            |
|---------------------------|:---------------:|:------------------------------------------:|:------------------:|
| No discrimination         | 1, 1            | $$\frac{k^2}{(1+k)^2}, \frac{1}{(1+k)^2}$$ | $$\frac{1}{k+1}$$  |
| Direct ($$\alpha$$ fixed) | $$\alpha,k$$    | $$\frac{2-\alpha}{4}, \frac{2-\alpha}{4}$$ | $$\frac{1+k}{4k}$$ |
| Covert ($$\delta = 1$$)   | $$\alpha(k),1$$ |                                            |                    |
| Unrestricted              | $$2,k$$         | 0, 0                                       | $$\frac{1+k}{2k}$$ |

The case of covert discrimination demonstrates an important precision tradeoff. Choosing a large value of $$ \alpha $$ increases competitiveness by awarding the prize more frequently to the player with the higher score. However, choosing a low value allows you to discriminate against the stronger player -- which also increases competitiveness. The effect that wins out depends on the size of the asymmetry between players. When $$ k $$ is large enough, this discrimination effect wins out. However, when direct discrimination is possible, there is no advantage to covert discrimination.

---

[^t]: Tullock contests were introduced 1980 by Gordon Tullock. The other major lottery contest is the rank order contest [(Lazear and Rosen 1981)](https://econpapers.repec.org/RePEc:ucp:jpolec:v:89:y:1981:i:5:p:841-64).
[^d]: The papers mentioned give different prize values instead of different costs. The two are equivalent. I prefer to say that one player is more skilled than to say that one player values the prize more.
[^apa]: In this case, it is not a lottery contest. It converges to the all-pay auction -- the main deterministic contest.

