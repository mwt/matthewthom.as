---
title: "Economics of Accessibility in Consumption"
author: "Matthew W. Thomas"
layout: "post"
override:tags: ["economics", "notes"]
date: "2025-12-02"
use_math: true
last_modified_at: "2025-12-02"
description: "Simple model of how markets fail to accommodate those with disabilities"
---

Markets tend not to accommodate disabled workers and consumers without outside intervention. There are numerous studies about disabled workers (e.g., [Haveman and Wolfe 2000](https://ideas.repec.org/h/eee/heachp/1-18.html), [Aizawa et al. 2024](https://ideas.repec.org/a/oup/restud/v92y2025i1p1-39..html)). However, I could only find one paper about how markets fail disabled consumers.[^1] I have been thinking about this issue for the last few years. I hope my thoughts are interesting both to economists (who may find a novel environment to explore) and to advocates for accessibility (who should find a different way of thinking about the problem). I will use blindness as my motivating example, but the ideas apply to disabilities more generally so long as those disabilities both (1) require accommodations that are either costly to the provider or diminish the experience for non-disabled consumers, and (2) are sufficiently uncommon.[^2]

## 1. Command-and-control successes and failures

Legal mandates are the standard tool for advancements in accessibility. While that seems to work for some clearly defined and enforced requirements (e.g., handicapped parking), mandates work less well when (1) enforcement is lacking or (2) requirements are harder to define.

For an example of _low enforcement_, [Ameri et al. 2020](https://doi.org/10.5465/amd.2018.0054) (that one relevant paper I mentioned) finds that Airbnb hosts are less likely to approve requests from guests with certain disabilities. They suggest that this may be because the ADA does not apply to most Airbnb hosts. Even if the regulations did apply, enforcing regulations for many small providers can be impractical.

For an example of _less defined objectives_, websites are arguably required to be accessible under the Americans with Disabilities Act,[^3] yet I have heard anecdotally from blind and visually impaired users that most of the web is inaccessible to the blind. There are also studies which show that the vast majority ([94.8%](https://webaim.org/projects/million/)) of top websites fail to meet requirements that can be automatically tested.

Legal mandates also do not encourage innovation beyond the minimum requirements. Many of the biggest innovations that benefit the blind and visually impaired seem to have been developed because of their usefulness to sighted users. For example, OCR (optical character recognition) software was initially developed to digitize printed text for searchability, not for screen readers. The same is true of AI image recognition, self-driving cars, voice assistants, and audiobooks.

## 2. Model of the market

I start with a quote from one of the many companies that has presented the market case for accessible websites for the blind and visually impaired alongside the legal mandate.

> Organizations who fail to meet [WCAG 2.2](https://www.audioeye.com/compliance/wcag/) Level AA requirements are not providing an accessible, [ADA-compliant](https://www.audioeye.com/post/does-my-website-have-to-be-ada-compliant/) website nor are they complying with [international accessibility laws](https://www.audioeye.com/post/international-accessibility-law-repository/). Non-compliance can result in potential legal action, including accessibility lawsuits and demand letters that can be time-consuming, expensive, and damaging to your reputation.
>
> More importantly, website accessibility opens the door to an often overlooked market. For businesses, this can lead to more revenue and increased growth which results in more customer engagement, satisfaction, and brand loyalty.
>
> -- [**AudioEye**](https://www.audioeye.com/post/accessibility-statistics/#why-is-accessibility-so-important)

This argument is plausible. Offering an accessible website would enable a company to sell to more customers. Maybe these added sales more than cover the cost of making the website accessible. However, it seems like companies do not make their websites accessible unless they are forced to. Do they just not understand the market opportunity?

Consider another quote on the opposite extreme from Domino's Pizza in their petition to the Supreme Court to overturn a ruling in circuit court that their website must be made accessible to the blind.

> Other defendants eliminate online offerings instead of attempting compliance—a choice that ultimately hurts all consumers, including people with disabilities. Many businesses and non-profits lack the resources required to overhaul their websites and mobile apps. Faced with the threat of ADA liability, they may decide to jettison online content.
>
> -- [**Petition to the Supreme Court by Domino's Pizza**](https://www.supremecourt.gov/DocketPDF/18/18-1539/102950/20190613153319483_DominosPetition.pdf)

This argument is also plausible. Maybe the cost of making a website accessible is so high that a company would rather shut their website down than provide an accessible one. Maybe the reason we see so few accessible websites is because the companies literally cannot afford to make them accessible.

Either of these possibilities could hold for some markets and some definition of accessibility. However, the most common situation is probably one that is in-between. The cost of making a website accessible is not so high that firms would prefer to shut down, but high enough that firms will not make their website accessible unless compelled to do so.

### 2.1. Basic model

Suppose that there is a monopolist seller providing a good which costs $c \geq 0$ to produce. A fraction, $\mu \in (0,1)$, of consumers are disabled and require an accommodation to consume the good. If the seller does not provide the accommodation, they can sell $(1-\mu) Q(p)$ units of the good at price $p$, where $Q(p)$ is the demand function. If the seller does provide the accommodation,

- It must pay fixed cost $K \geq 0$ to provide the accommodation;[^4] and
- It can sell $(1-\mu) Q(p)$ units of the good at price p for the non-accessible version $\mu Q(r)$ units of the good at price r for the accessible version.

You may object that the seller can charge different prices for the accessible and non-accessible versions of the good. It will not matter in this model, because the prices will be the same anyway. However, we explore settings where this matters in Section 3.

### 2.2. Solving the model

When the seller does not provide the accommodation, we have a standard monopoly problem. The seller sets the price, $p^*$, to maximize the profits of selling to non-disabled consumers,

$$
\text{Profits} = \max_{p} \underbrace{(p - c)}_{ \text{per-unit profit} } \underbrace{(1 - \mu) Q(p)}_{\text{units}}. \eqnum{1}
$$

When the seller does provide the accommodation, they will set the two prices to maximize profits from both disabled and non-disabled consumers,

$$
\text{Profits} = \max_{p,r} (p - c) (1 - \mu) Q(p) + (r - c) \mu Q(r) - K,
$$

which can also be written as

$$
\text{Profits} = \max_{p} (p - c) Q(p) - K. \eqnum{2}
$$

The seller would rather close than provide the accommodation if [(2)](#eqn-2) is less than zero, and the seller will provide the accommodation if the profits from [(2)](#eqn-2) exceed those from [(1)](#eqn-1). Therefore, there are three cases.

**Case 1:** The seller will provide the accommodation if

$$
    \max_{p} (p - c) Q(p) \geq \frac{K}{\mu}. \eqnum{3}
$$

**Case 2:** The seller will not provide the accommodation, but prefers to provide the accommodation than to close if

$$
    \frac{K}{\mu} \geq \max_{p} (p - c) Q(p) \geq K. \eqnum{4}
$$

**Case 3:** The seller will not provide the accommodation, and prefers to close than to provide the accommodation if

$$
    K \geq \max_{p} (p - c) Q(p). \eqnum{5}
$$

### 2.3. Interpretation

The maximized part of the inequalities in [(3)](#eqn-3), [(4)](#eqn-4), and [(5)](#eqn-5) is the profit that the seller would make if everyone were non-disabled. So, the firm's decision depends on the relationship between the company's profits, the cost of accommodating disabled consumers, and the fraction of consumers who are disabled.

Case 1 is the good scenario described by AudioEye where it is profitable to provide the accommodation because the disabled users are valuable enough to more than cover the cost of the accommodation. Case 3 is the bad scenario described by Domino's where the cost of accommodating disabled users is so high that the company would rather shut down than provide the accommodation.

Domino's identified one example of Case 3 where Berkeley [discontinued a website which did not make any money](https://www.insidehighered.com/news/2017/03/06/u-california-berkeley-delete-publicly-available-educational-content) rather that make it accessible to the blind. We can see that Case 3 always holds if profits are zero. I consider this further in Section 2.5.

Case 2 is the middle scenario where disabled users are not accommodated because they are a minority with specific needs that are not appreciated by the larger majority group of non-disabled users. In this case, the company would provide the accommodation if everyone were disabled, but since only a small fraction are disabled, the cost of accommodating them is not worth it for them.

About 2.5% of the US population has a visual disability.[^5] They access websites less frequently than non-disabled users. So, let's say the number is $0.0138 \sim 1/72 = \mu$. [That is similar to this estimate from Stack Exchange](https://ux.stackexchange.com/a/119596). We can substitute this back of the envelope calculation into [(4)](#eqn-4) to obtain

$$
72 K \geq \max_{p} (p - c) Q(p) \geq K.
$$

If we think about a medium sized retailer that estimates the cost of making their website accessible to be about \$35,000, then they would be in Case 2 if the profits they make from their website are between \$35,000 and \$2,520,000. That's a wide range that many firms likely fall into.

Moreover, if a firm's website is among the [94.8%](https://webaim.org/projects/million/) of websites that are not accessible, we can infer that they believe the cost of making their website accessible is at least 1.38% of their profits from the website. So, if a firm's profits from their website are \$1,000,000, they believe the cost of making their website accessible is at least \$13,800. That seems plausible.

### 2.4. This is not a traditional market failure

The market in this model does not maximize total surplus for multiple reasons. First, the seller is a monopolist; so, it is not competitive. Moreover, there is a fixed cost to provide the accommodation, which is a barrier to entry.

However, the bigger issue is not that this market fails to maximize total surplus. The issue is that disabilities are fundamentally ethically different from the preferences that markets typically aggregate. To see this, consider the following two situations:

1. A small group of users (1% of the population) is **blind** and **must** use **screen readers** to access websites. A firm chooses to not make its website compatible with **screen readers** because they assert that the cost of doing so (\$30k) is too high relative to the revenue they would gain from the small group of **blind** users (\$10k). Upset by this, the government mandates that all websites must be compatible with **screen readers**.
2. A small group of users (1% of the population) is **eccentric** and **will only** use **Netscape Navigator** to access websites. A firm chooses to not make its website compatible with **Netscape Navigator** because they assert that the cost of doing so (\$30k) is too high relative to the revenue they would gain from the small group of **eccentric** users (\$10k). Upset by this, the government mandates that all websites must be compatible with **Netscape Navigator**.

Do you view these situations as equivalent? A market does. A market does not distinguish between a customer who cannot do something and a customer who chooses not to. The Math is unaffected. Most everyone would want these two situations to be treated differently, but a market will not do this without intervention.

### 2.5. Robust policy: exempt noncommercial offerings

Consider the problem of setting a fee that a firm could pay to be exempt from disability regulation. If we were to set such a fee, we might want to set it so that all firms in Case 3 (who would rather close than provide the accommodation) would pay the fee and remain open, but all firms in Case 1 or 2 (who would provide the accommodation if everyone were disabled) would provide the accommodation rather than pay the fee. We will use the value of this fee to make the case for exempting noncommercial offerings. The formal analysis helps define what a noncommercial offering is and demonstrates the issue with extending such an exemption to small commercial offerings.

Suppose that we know the profits of a firm and the proportion of customers with relevant disabilities. The optimal fee is $(1 - \mu) \max_{p} (p - c) Q(p)$, i.e., the full profits that the firm would make from non-disabled consumers. With this fee, the firm faces cost, $K$, of accommodating (the left-hand side of [Equation 5](#eqn-5)) and a benefit equal to the full profits they could earn from the entire market (the right-hand side of [Equation 5](#eqn-5)). So, they will provide the accommodation exactly when [(5)](#eqn-5) does not hold. If the fee were any lower, firms with a cost of accommodating less than the full profits would pay the fee rather than provide the accommodation. If it were any higher, firms with a cost of accommodating greater than the full profits would rather close than pay the fee.

This means that the right fee is one that ensures the firm is not allowed to earn any profits if they do not provide the accommodation. In practice, there is no reason to implement such a fee. A firm with no revenue is noncommercial and moreover, a firm with only enough revenue to recoup their costs is also noncommercial. If a company intended to be commercial, but the cost of accommodating disabled users is so high that they cannot make any profit, then they can still provide their offering if they do so noncommercially.

Note that this analysis excludes dynamics. Thus, it does not apply to a scale which is currently unprofitable but intends to in the future. It would apply, however, to the open course website that Berkeley discontinued. Of course, we still want these noncommercial offerings to be made accessible, but this can more effectively be achieved through rewards rather than penalties. For example, Berkeley could have received a grant to make their open course website accessible.

You can also use grants to supplement penalties for commercial offerings. For example, you could offer grants to smaller commercial offerings to encourage them to provide accommodations.

### 2.6. Minimal penalty

Penalties should be large enough to push firms in Case 2 to provide accommodations. This means that a firm choosing not to accommodate must expect to pay at least $K - \mu \max_{p} (p - c) Q(p)$, the accommodation cost minus the profits from selling to disabled consumers. Because enforcement is not perfect, the actual penalty charged should be at least this number divided by the probability of enforcement. Any penalty greater than this also works. The cost of accommodating, $K$, divided by the enforcement probability is appealing because it requires estimating fewer parameters.

## 3. Extensions

The preceding analysis is very simple. There are some extensions that help contextualize the model and raise additional issues.

### 3.1. Different demands

There is no reason to think that disabled and non-disabled consumers value the good equally or in the same way. For example, an image gallery could be more valuable to sighted users than blind users. On the other hand, the opposite might be true of a podcast. This will affect the interpretation slightly when the price for the accessible and non-accessible versions of the good are allowed to be different. Forcing the prices to be the same reduces the firm's incentive to accommodate, but the basic insights still hold.

For this section, we modify the model from Section 2.1 so that the demand for disabled customers is given by a different demand function, $Z(r)$:

- An accommodating firm can sell $(1-\mu) Q(p)$ units of the good at price $p$ for the non-accessible version $\mu Z(r)$ units of the good at price $r$ for the accessible version.

#### 3.1.1. Different prices

If the prices can be different, then we can get equivalence by substituting a transformed $\mu$ parameter. In particular, the analysis of this model is identical to that of Section 2 with $\mu$ replaced by

$$
\mu' = \frac{\mu \max_r Z(r) (r-c) }{(1-\mu) \max_p Q(p) (p-c) + \mu \max_r Z(r) (r-c)}.
$$

That is, in Section 2, we interpreted $\mu$ as the fraction of actual consumers who are disabled. What really matters is the fraction of profits that come from disabled consumers. When the demand functions are equal, the share of customers and the share of profits are the same.

#### 3.1.2. Same prices

If we require that the prices be the same, we are not affecting the profits of a firm that chooses not to accommodate, but we are constraining the profitability of a firm that chooses to accommodate. The firm can choose to set the prices for the accessible and non-accessible products to be equal in either case. However, forcing the prices to be the same introduces an additional restriction on profits. Putting these same words in terms of math, by the triangle inequality,

$$
\max_p{(p-c) (1-\mu) Q(p) + (p-c)\mu Z(p)} \leq \left[ \max_p{(p-c) (1-\mu) Q(p)} \right] + \left[ \max_r{(r-c) \mu Z(r)} \right].
$$

Thus, when prices must be the same, firms have less incentive to accommodate. Most of the analysis works in one direction. A firm that meets the non-accommodating case conditions (Case 2 or Case 3) for differentiated prices will still be in that same case. However, it is possible for a firm to meet the accommodating condition (Case 1) for differentiated prices and actually be in Case 2.

The argument to exempt noncommercial offerings still holds with the added detail that you should also exempt a product which no disabled customers want--- i.e., $Z(p^\star)=0$. Moreover, the minimal penalty from Section 2.6 is not necessarily sufficient. However, the cost of accommodating, $K$, is always sufficient.[^6]

### 3.2. Incorporating competition

Until this point, I have omitted the possibility that there may be competition in the market for non-disabled customers, but an opportunity for monopoly in serving disabled customers. One might suspect that a firm would be more likely to accommodate if doing so gives it access to a market which is less competitive than its current one. This is not true in general, but there are circumstances under which the intuition holds.

If the participants can charge different prices to disabled and non-disabled customers, a competitor in the non-disabled market does not affect the firm's choice to accommodate because this competition reduces the firm's profits from accommodating and not accommodating by the same amount. It does affect the firm's choice to close because there is less benefit to remaining in the market. Thus, it is possible for accessibility requirements to make a market less competitive. If all firms but one exit a market, the behavior of the remaining monopolist is described by Section 2.

The more interesting case is the one where firms must charge the same price to disabled and non-disabled customers. To answer this question, we modify the model from Section 2.1 so that our firm can sell $(1-\mu)Q(p;y)$ units of the good to non-disabled customers where $y$ is the price set by a competitor. It will not matter how competitor sets prices, but you can think of them as having the same demand. The competitor does not accommodate. As such, when the firm accommodates, the firm can also sell $\mu Q(p;\infty)$ units of the good to disabled customers. Then, the firm will accommodate if and only if

$$
\max_p{(p-c) (1-\mu) Q(p;y)} + K \leq \max_p{(p-c) (1-\mu) Q(p;y) + (p-c)\mu Q(p;\infty)}.
$$

As in Section 3.1.2, if the firm accommodates when they cannot set separate prices, they would also accommodate if they could set separate prices because by the triangle inequality,

$$
\max_p{(p-c) (1-\mu) Q(p;y) + (p-c)\mu Q(p;\infty)} \leq \left[ \max_p{(p-c) (1-\mu) Q(p;y)} \right] + \left[ \max_r{(r-c) \mu Q(r;\infty)} \right].
$$

As previously established, if the firm can set separate prices, competition in for non-disabled customers has no effect on the firm's decision to accommodate. So, when disabled and non-disabled customers have the same demand, competition can only diminish the firm's incentive to provide the accommodation.

However, if the disabled and non-disabled customers have different demands, it's possible for competition in the market for disabled customers to increase the firm's incentive to accommodate. For example, if disabled users have less demand for the good, the increased market power for disabled customers can help to offset this and result in an increased incentive to accommodate.[^7]

## Disclaimer

The views expressed in this article are those of the author and do not necessarily reflect those of the Federal Trade Commission
or any individual Commissioner.

[^1]: This paper is [Ameri et al. 2020](https://doi.org/10.5465/amd.2018.0054) which is a Management paper demonstrating that Airbnb hosts are less likely to approve requests from guests with certain disabilities.
[^2]: These two conditions are sufficient, but they are not necessary. There are circumstances where an inexpensive accommodation for a very common disability may not be provided. E.g., if the disabled population is so low-income that they are not valuable customers.
[^3]: The legal requirements are interpreted differently in different circuit courts (see [this blog post](https://www.saul.com/insights/blog/ada-website-accessibility-risk) for more information).
[^4]: We could also consider per-unit costs, but they do not have much effect. In standard settings, per-unit costs alone cannot explain the lack of accommodations.
[^5]: See [Cornell's 2023 Annual Disability Status Reports](http://www.disabilitystatistics.org/) which are based on the American Community Survey for more information.
[^6]: You can do better, for example, $K-(p^m-c)Z(p^m)$, where $p^m$ is the price that prevailed in the market when the accommodation was not provided.
[^7]: For example, consider the case where $Z(p;\infty)=Q(p;y)$. Then, you can use the triangle inequality to show that if the firm has an incentive to accommodate without a competitor in the non-disabled market, then they have an incentive to accommodate with a competitor as well.
