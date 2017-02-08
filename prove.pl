prove(A):-
    ( A=true    -> true              % we're done
    ; A=not(B)  -> not(prove(B))     % negation as failure
    ; A=(B,C)   -> prove(B),prove(C) % conjunctive query
    ; otherwise -> cl(A,B),prove(B)  % resolve against clause
    ).

% cl(H,B) <- (H:-B) is object-level clause
cl(rectangle,(polygon(4),angles(90))).
cl(square,(rectangle,regular)).
cl(triangle,polygon(3)).
cl(equilateral_triangle,(triangle,regular)).
%%% facts
cl(polygon(4),true).
cl(regular,true).
cl(angles(90),true).


prove_r(A):-
    writeln(A), % show current query
    ( A=true    -> true
    ; A=not(B)  -> not(prove_r(B))
    ; A=(B,C)   -> cl(B,D),conj_append(D,C,E),prove_r(E)
    ; otherwise -> cl(A,B),prove_r(B)
    ).

conj_append(A,B,C):-
    ( A=true    -> B=C
    ; A=(A1,A2) -> C=(A1,C2),conj_append(A2,B,C2)
    ; otherwise -> C=(A,B)
    ).


% display a proof tree
prove_p(A):-prove_p(A,P),write_proof(P).

prove_p(A,P):-
    ( A=true    -> P=[]
    ; A=(B,C)   -> cl(B,D),conj_append(D,C,E),
                   prove_p(E,PE),P=[p(A,(B:-D))|PE]
    ; otherwise -> cl(A,B),prove_p(B,PB),
                   P=[p(A,(A:-B))|PB]
    ).

write_proof([]):-
	write('...............[]'),nl.
write_proof([p(A,B)|Proof]):-
	write((:-A)),nl,
	write('.....|'),write('..........'),write(B),nl,
	write('.....|'),write('..................../'),nl,
	write_proof(Proof).
