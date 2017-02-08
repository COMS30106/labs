prove(A):-
    ( A=true    -> true
    ; A=(B,C)   -> prove(B),prove(C)
    ; bypass(A) -> call(A)
    ; otherwise -> cl(A,B),prove(B)
    ).

% cl(H,B) <- (H:-B) is true
cl(rectangle,(polygon(4),angles(90))).
cl(square,(rectangle,regular)).
cl(triangle,polygon(3)).
cl(equilateral_triangle,(triangle,regular)).
cl(polygon(4),true).
cl(regular,true).
cl(angles(A),(regular,polygon(N),A is (N-2)*180/N)).

bypass(is(_L,R)):-ground(R).
