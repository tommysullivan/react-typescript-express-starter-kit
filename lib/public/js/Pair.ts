export interface Pair<T1, T2> { _1:T1, _2:T2 }
export function P<T1, T2>(_1:T1, _2:T2) { return { _1:_1, _2:_2 }; }
export function zip<T1, T2>(a1:T1[], a2:T2[]):Pair<T1,T2>[] {
    let pairs = [] as Pair<T1, T2>[];
    a1.forEach((v, i) => {
        pairs.push(P(v, a2[i]));
    });
    return pairs;
}