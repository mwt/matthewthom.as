---
title: "Optimization of Functionals and the Calculus of Variations"
author: "Matthew W. Thomas"
layout: "post"
override:tags: ["math", "economics", "notes"]
date: "2022-02-12"
use_math: true
last_modified_at: "2022-10-19"
description: "Notes about how to optimize over a space of functions instead of numbers"
---

There are many settings in Economics, particularly in mechanism design, where one wants to fund a function that maximizes (or minimizes) some objective. It turns out this works similarly to regular calculus.

## Motivation

Consider the expected revenue of a mechanism designed to sell a good to one agent who's value of the good is distributed uniformly with support $[ 0, 1 ]$. This expected revenue is known to be

$$
R[p] = \int_0^1 p(v) (2 v - 1)\, dv
$$

where $p(v)$ is a function that determines the probability of selling the good to the agent when her value is $v$ and $2 v - 1$ is the *virtual surplus*. The above equation, $R[p]$, is a *functional* of $p$. That is, it maps the function $p$ to a real number. Suppose that you wanted to find the revenue maximizing mechanism $p$. Then, the problem you want to solve is

$$
\max_p \int_0^1 p(v) (2 v - 1)\, dv
$$

subject to $0 \leq p(v) \leq 1$. If you look at this problem closely, you will note that the optimal function must be

$$
p(v) = 
\begin{cases}
0 &\text{ if } v < 0.5 \\
1 &\text{ if } v > 0.5
\end{cases}
$$

where the value at one half does not matter. This is because $p$ is multiplied by some "slope". When the slope is positive, we want $p$ to be as large as possible. When the slope is negative, we want $p$ to be as small as possible. Indeed, the *functional derivative* of $R[p]$ is

$$
\frac{\delta R}{\delta p}(v) = 2v - 1
$$

We will see that the functional derivative formalizes our intuition about this slope. It will allow us to solve optimization problems that are nonlinear.

## On the reals

Optimization over function spaces is a natural extension of optimization over the reals. So, it's important to remember exactly how optimization works on functions of real vectors. Consider the following function $g : \mathbb{R}^N \to \mathbb{R}$.

$$
    g(X) = (x_1)^2 + (x_2)^2
$$

where $X = (x_1, x_2)$. The directional derivative in the direction $V = (v_1, v_2)$ is

$$
\begin{align*}
    dg_V(X) &= \lim_{\epsilon \to 0} \left[ \frac{g(X + \epsilon V) - g(X)}{\epsilon} \right] \\
            &= \nabla g(X) \cdot V \\
            &= 
            \begin{bmatrix}
                2 x_1 \\
                2 x_2
            \end{bmatrix}
            \cdot V \\
\end{align*}
$$

If $X^\star$ is a minimum, there cannot be a direction, $V$, such that $dg_V(X^\star) < 0$. This would imply that there exists an $\epsilon > 0$ such that $g(X^\star + \epsilon V) < g(X^\star)$. This contradicts the assumption that $X^\star$ is a minimum. In addition, there cannot be a $V$ such that $dg_V(X^\star) > 0$ because his would imply $dg_{(-V)}(X^\star) = - dg_{V}(X^\star) < 0$.

Therefore, we know that for any $X^\star$, $dg_V(X^\star) = 0$ for all $V \in \mathbb{R}^2$. This is only possible if $\nabla g(X^\star) = (0, 0)$ which means $\frac{\partial g(X^\star)}{\partial x_1} = 2 x_1 = 0$ and $\frac{\partial g(X^\star)}{\partial x_2} = 2 x_2 = 0$. So, the only local stationary point is at $(0,0)$. However, stationarity is a necessary but not sufficient condition. We would need to test for convexity to ensure that this is a minimum. Though, it obviously is.

Functional optimization follows the same principles.

## On continuous functions

Suppose there is a known continuous function $\phi$ that we want to approximate with another continuous function using least squares on the interval $[0, 1]$. That is, you want to minimize the following functional

$$
    L[f] = \int_0^1 (f(x) - \phi(x))^2\, dx.
$$

Of course, the minimum is going to be at $f^* = \phi$. We will solve this by finding the Gateaux differential of $L$ with respect to some direction, $\psi$. This is defined in the same way as the directional derivative on the reals

$$
    dL_{\psi}[f] = \lim_{\epsilon \to 0} \left[ \frac{L[f + \epsilon \psi] - L[f]}{\epsilon} \right].
$$

So, the Gateaux differential of $L$ is

$$
\begin{align*}
    dL_{\psi}[f] &= \lim_{\epsilon \to 0} \left[ \int_0^1 \frac{ (f(x) + \epsilon \psi(x) - \phi(x))^2 - (f(x) - \phi(x))^2}{\epsilon} \, dx \right] \\
            &= \lim_{\epsilon \to 0} \left[ \int_0^1 \frac{ 2f(x) - 2\phi(x) + \epsilon\psi(x)}{\epsilon} \epsilon\psi(x) \, dx \right] \\
            &= \int_0^1 2 (f(x) - \phi(x)) \psi(x) \, dx\\
\end{align*}
$$

which is the inner product of the *functional derivative*,

$$
    \frac{\delta L}{\delta f}(x) = 2 (f(x) - \phi(x)),
$$

and the direction, $\psi$. Like in calculus on the reals, we need this to be zero for all directions. It turns out that, just like before, we only need to set the directional derivative to zero. This is due to the following lemma.

**Fundamental lemma of calculus of variations** *If* $g$ *is continuous on* $[a,b]$ *and satisfies the equality*

$$
    \int_a^b g(x) \psi(x) \, dx = 0
$$

*for all continuous functions* $\psi$ *such that* $\psi(a)=\psi(b)=0$*, then* $g(x) = 0$ *for all* $x \in [a,b]$.

This means that $dL_{\psi}[f]=0$ if and only if $2 (f(x) - \phi(x)) = 0$ for all $x \in [0,1]$. So, $f = \phi$ as anticipated.
