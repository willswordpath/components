find . -not \( -path './node_modules' -prune \) -not \( -path './.git' -prune \) | sort | less
