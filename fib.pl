% fib(N,F) <- F is the N-th Fibonacci number
% inefficient doubly-recursive version
fib(1,1).
fib(2,1).
fib(N,F):-
	N>2,N1 is N-1,N2 is N-2,
	fib(N1,F1),fib(N2,F2),
	F is F1+F2.


% fibt(N,E) <- E is an arithmetic expression 
% representing the N-th Fibonacci number
% that can be rendered as a tree
% and evaluated with is/2.
fibt(1,1).
fibt(2,1).
fibt(N,(F1+F2)):-
	N>2,N1 is N-1,N2 is N-2,
	fibt(N1,F1),fibt(N2,F2).


% fibn(N,Na,Nb,F) <- F is the N-th Fibonacci number
%                    in the sequence starting with Na, Nb
fibn(1,Na,_,Na).
fibn(2,_,Nb,Nb).
fibn(N,Na,Nb,F):-
	N>2, N1 is N-1,
	Nc is Na+Nb,
	fibn(N1,Nb,Nc,F).

% the original Fibonacci sequence starts with 1, 1
fibn(N,F):-
	fibn(N,1,1,F).
