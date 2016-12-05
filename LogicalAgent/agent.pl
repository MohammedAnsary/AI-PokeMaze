%This example worked successfully and result was
%S = result(moveLeft(3, 2), result(moveLeft(3, 3), result(moveDown(2, 3), result(moveDown(1, 3), result(moveUp(2, 3), result(moveRight(2, 2), result(moveRight(2, 1), result(moveDown(1,1), result(moveLeft(1, 2), result(moveDown(0, 2), s0))))))))))
% steps(2).
% pokemon(loc(1, 1), s0).
% pokemon(loc(1, 3), s0).
% pokemon(loc(2, 3), s0).
% pokemon(loc(3, 3), s0).
% path(loc(0, 0), loc(1, 0)).
% path(loc(1, 0), loc(2, 0)).
% path(loc(2, 0), loc(3, 0)).
% path(loc(3, 0), loc(3, 1)).
% path(loc(3, 1), loc(3, 2)).
% path(loc(3, 2), loc(3, 3)).
% path(loc(3, 3), loc(2, 3)).
% path(loc(2, 3), loc(2, 2)).
% path(loc(2, 2), loc(2, 1)).
% path(loc(2, 1), loc(1, 1)).
% path(loc(1, 1), loc(1, 2)).
% path(loc(1, 2), loc(0, 2)).
% path(loc(0, 2), loc(0, 1)).
% path(loc(2, 3), loc(1, 3)).
% path(loc(1, 3), loc(0, 3)).
% at(loc(0, 2), 2, s0).
% end(loc(3, 1)).

%This example worked successfully and result was
%S = result(moveLeft(3, 3), result(moveDown(2, 3), result(moveDown(1, 3), result(moveRight(1, 2), result(moveUp(2, 2), result(moveRight(2, 1), result(moveUp(3, 1), result(moveRight(3, 0), result(moveLeft(3, 1), result(moveDown(2, 1), s0))))))))))
% steps(3).
% pokemon(loc(1, 2), s0).
% pokemon(loc(3, 0), s0).
% path(loc(0, 0), loc(1, 0)).
% path(loc(1, 0), loc(1, 1)).
% path(loc(1, 1), loc(0, 1)).
% path(loc(0, 1), loc(0, 2)).
% path(loc(0, 2), loc(0, 3)).
% path(loc(0, 3), loc(1, 3)).
% path(loc(1, 3), loc(1, 2)).
% path(loc(1, 2), loc(2, 2)).
% path(loc(2, 2), loc(2, 1)).
% path(loc(2, 1), loc(3, 1)).
% path(loc(3, 1), loc(3, 0)).
% path(loc(3, 0), loc(2, 0)).
% path(loc(1, 3), loc(2, 3)).
% path(loc(2, 3), loc(3, 3)).
% path(loc(3, 3), loc(3, 2)).
% at(loc(2, 1), 3, s0).
% end(loc(3, 2)).

%This example worked successfully and result was
% S = result(moveDown(0, 2), result(moveRight(0, 1), result(moveUp(1, 1), result(moveDown(0, 1), result(moveLeft(0, 2), s0)))))
steps(1).
pokemon(loc(1, 1), s0).
path(loc(0, 0), loc(1, 0)).
path(loc(1, 0), loc(2, 0)).
path(loc(2, 0), loc(2, 1)).
path(loc(2, 1), loc(2, 2)).
path(loc(2, 2), loc(1, 2)).
path(loc(1, 2), loc(0, 2)).
path(loc(0, 2), loc(0, 1)).
path(loc(0, 1), loc(1, 1)).
at(loc(0, 2), 1, s0).
end(loc(1, 2)).

path2(loc(R1, C1), loc(R2, C2)):-
    path(loc(R1, C1), loc(R2, C2));
    path(loc(R2, C2), loc(R1, C1)).

at(loc(R, C), H, result(A, S)):-
    steps(H0),
    R1 is R + 1,
    H1 is min(H + 1, H0),
    A = moveUp(R1, C),
    path2(loc(R, C), loc(R1, C)),
    % nl,
    % print(loc(R1,C)),
    % print(A),
    at(loc(R1, C), H1, S).

at(loc(R, C), H, result(A, S)):-
    steps(H0),
    R1 is R - 1,
    H1 is min(H + 1, H0),
    A = moveDown(R1, C),
    path2(loc(R, C), loc(R1, C)),
    nl,
    print(loc(R1,C)),
    print(A),
    at(loc(R1, C), H1, S).

at(loc(R, C), H, result(A, S)):-
    steps(H0),
    C1 is C - 1,
    H1 is min(H + 1, H0),
    A = moveRight(R, C1),
    path2(loc(R, C), loc(R, C1)),
    nl,
    print(loc(R,C1)),
    print(A),
    at(loc(R, C1), H1, S).

at(loc(R, C), H, result(A, S)):-
    steps(H0),
    C1 is C + 1,
    H1 is min(H + 1, H0),
    A = moveLeft(R, C1),
    path2(loc(R, C), loc(R, C1)),
    nl,
    print(loc(R,C1)),
    print(A),
    at(loc(R, C1), H1, S).

at(loc(R, C), H, result(A, S)):-
    R1 is R + 1,
    A = moveUp(R1, C),
    \+path2(loc(R, C), loc(R1, C)),
    at(loc(R, C), H, S).

at(loc(R, C), H, result(A, S)):-
    R1 is R - 1,
    A = moveDown(R1, C),
    \+path2(loc(R, C), loc(R1, C)),
    at(loc(R, C), H, S).

at(loc(R, C), H, result(A, S)):-
    C1 is C - 1,
    A = moveRight(R, C1),
    \+path2(loc(R, C), loc(R, C1)),
    at(loc(R, C), H, S).

at(loc(R, C), H, result(A, S)):-
    C1 is C + 1,
    A = moveLeft(R, C1),
    \+path2(loc(R, C), loc(R, C1)),
    at(loc(R, C), H, S).

pokemon(loc(R, C), result(A, S)):-
    R1 is R + 1,
    pokemon(loc(R, C), S),
    A = moveUp(Y, X),
    (\+Y = R1;
    \+X = C;
    \+path2(loc(R, C), loc(R1, C))).

pokemon(loc(R, C), result(A, S)):-
    R1 is R - 1,
    pokemon(loc(R, C), S),
    A = moveDown(Y, X),
    (\+Y = R1;
    \+X = C;
    \+path2(loc(R, C), loc(R1, C))).

pokemon(loc(R, C), result(A, S)):-
    C1 is C - 1,
    pokemon(loc(R, C), S),
    A = moveRight(Y, X),
    (\+Y = R;
    \+X = C1;
    \+path2(loc(R, C), loc(R, C1))).

pokemon(loc(R, C), result(A, S)):-
    C1 is C + 1,
    pokemon(loc(R, C), S),
    A = moveLeft(Y, X),
    (\+Y = R;
    \+X = C1;
    \+path2(loc(R, C), loc(R, C1))).

nopokemons(S):-
    setof(loc(Y, X), pokemon(loc(Y, X), s0), List),
    nope(S, List).

nope(_, []).
nope(S, [H|T]):-
    \+pokemon(H, S),
    nope(S, T).

query(Limit, S):-
    end(loc(R, C)),
    call_with_depth_limit(at(loc(R, C), 0, S), Limit, _),
    nopokemons(S).

solve(T, Limit, S):-
    T > 0,
    L1 is Limit + 1,
    T1 is T - 1,
    (query(Limit, S);
    solve(T1, L1, S)).
