import { shouldPayForPassingStart } from "../shouldPayForPassingStart";

describe('Testing if player passed start', () => {
    // Cofasz się o 3 pola,
    // Wracasz do Madrytu => Prawdopodobnie trzeba dodać didPassStart do playera
    // Wracasz na start => z automatu dodać => jeżeli index 1 a potem inny to płać
    // Idziesz do więzienia, nie przechodzisz przez start, nie dostajesz 400 // Tutaj flaga didPassStart
    // Idziesz do Neapolu, jeżeli przechodzisz przez start otrzymujesz ...  // Flagi nie trzeba
    // Wracasz do bruxeli, jeżeli przechodzisz przez start dostajesz 400 ... // Wracasz, więc jeszcze kierunek dochodzi.. Jeżeli byłeś na 5 a wracasz na 6 to przechodzisz przez start cofając się
    // Idziesz do kolei wschodnich, jeżeli przechodzisz...
    // Wracasz do wiednia... Nie ma nic o starcie, więc trzeba wymusić nie płacenie podczas tej operacji // Flaga
    it('Should return ', () => {
        // const result = shouldPayForPassingStart();
        expect(undefined).toBeUndefined()
    })
});
