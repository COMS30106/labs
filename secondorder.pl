biglist(Low,High,L):-
    bagof(X,between(Low,High,X),L).
  
% between/3 is built-in but could have been defined as follows:  
% between(Low,_High,Low).
% between(Low,High,Number):-
% 	Low < High,
% 	NewLow is Low+1,
% 	between(NewLow,High,Number). 


:-use_module(library(random)). % for randseq/3 to generate random lists

setof_sort(In,Out):-
    setof(X,member(X,In),Out).


% list of pairs
p1(L,X,Y):-
	bagof((X,Y),(between(1,3,X),between(X,3,Y)),L).

% one list for each X
p2(L,X,Y):-
	bagof(Y,(between(1,3,X),between(X,3,Y)),L).

% lists for each X combined
p3(L,X,Y):-
	bagof(Y,X^(between(1,3,X),between(X,3,Y)),L).

% one list for each Y
p4(L,X,Y):-
	bagof(X,(between(1,3,X),between(X,3,Y)),L).

% lists for each Y combined
p5(L,X,Y):-
	bagof(X,Y^(between(1,3,X),between(X,3,Y)),L).

