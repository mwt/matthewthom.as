#%% Setup
from matplotlib import rc

rc("font", **{"family": "serif", "serif": ["Computer Modern Roman"], "size": 20})
rc("text", usetex=True)

import os
import numpy as np
import mpmath as mp
import matplotlib.pyplot as plt
from scipy.special import lambertw
from scipy import optimize

# path = os.path.expanduser(
#     "~\\Documents\\Git\\mattwthomas.com\\assets\\images\\posts\\2021\\"
# )
# os.chdir(path)

#%% alpha plot

nn = 50  # resolution of plot
xmin = 0
xmax = 1

def alphabar(dk):
    logdk = np.log(dk)
    W = lambertw( -dk * logdk )
    return 1 - W / logdk


x = np.linspace(1 / nn, xmax, nn)
y = alphabar(x)

figure = plt.figure()
plt.plot(x, y)
plt.fill_between(x, y, alpha=0.2)
plt.axis([xmin, xmax, 0, 2])
plt.ylabel(r"$\bar{r}(\delta / k)$")
plt.xlabel(r"$\delta / k$")
plt.xticks([0, 0.25, 0.5, 0.75, 1], [0, 0.25, 0.5, 0.75, 1])
plt.yticks([0, 1, 2])
figure.set_dpi(100)
figure.set_size_inches(4, 2.5)
figure.savefig("tullock-maximum-r.svg", optimize=True, bbox_inches="tight")


# %% direct discrimination

nn = 50  # resolution of plot
xmin = 0
xmax = 4


def s1(d, k=2):
    return (k * d) / (k + d) ** 2


x = np.linspace(xmin, xmax, nn)
y = s1(x, k=2)

figure = plt.figure()
plt.plot(x, y)
plt.axis([xmin, xmax, 0, 0.3])
plt.ylabel(r"$s_1$")
plt.xlabel(r"$\delta$")
plt.xticks([0, 1, 2], ["0", "1", "k"])
plt.yticks([0])
figure.set_dpi(100)
figure.set_size_inches(4, 2.5)
figure.savefig("tullock-direct-discrimination.svg", bbox_inches="tight")

# %% covert discrimination

nn = 1000  # resolution of plot
xmin = 1
xmax = 10

x = np.linspace(xmin + 1/nn, xmax, nn)

# Create inner loop
def alphainner(a, k):
    f1 = 1 / np.log(k)
    f2 = 1 - (2 / (1 + k ** a) )
    return a - f1/f2

# make an initial guess
f10 = 1 / np.log(x)
f20 = 1 - (2 / (1 + x) )

y = optimize.root(alphainner, x0 = (f10/f20), args=(x))

figure = plt.figure()
plt.plot(x, y.x)
plt.plot(x, alphabar(1/x))
plt.axis([xmin, xmax, 0, 2])
plt.ylabel(r"$r$")
plt.xlabel(r"$k$")
plt.xticks(np.linspace(1, xmax, xmax))
plt.yticks([0,1,2])
plt.legend([r"$r^\star(k)$", r"$\bar{r}(1/k)$"])
figure.set_dpi(100)
figure.set_size_inches(4, 2.5)
figure.savefig("tullock-covert-discrimination.svg", bbox_inches="tight")

# %% revenue graph

nn = 1000  # resolution of plot
xmin = 1
xmax = 3


def revenue(r, k=1.5, d=1):
    return (r <= alphabar(d/k))*(1 + 1/k)*((r*(k*d)**r)/(k**r+d**r)**2) + (r > alphabar(d/k))*(r <= 2)*(2/r)*(r-1)**((r-1)/r)*(d/k)*((1+k)/(2*k))+(r>2)*(d/k)*((1+k)/(2*k))
x = np.linspace(xmin, xmax, nn)
y = revenue(x, k=2) 

figure = plt.figure()
plt.plot(x, y)
#plt.axis([xmin, xmax, 0, 0.42])
plt.ylabel("Revenue")
plt.xlabel(r"$r$")
plt.xticks([1, alphabar(1/1.5), 2], ["1", r"$\bar{r}$", "2"])
plt.vlines([alphabar(1/1.5),2], ymin=min(y), ymax=max(y), color="grey", linestyle="dashed")
plt.yticks([])
figure.set_dpi(100)
figure.set_size_inches(4, 2.5)
figure.savefig("tullock-covert-revenue.svg", bbox_inches="tight")
# %%
