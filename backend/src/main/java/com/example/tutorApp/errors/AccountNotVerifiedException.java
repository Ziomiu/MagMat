package com.example.tutorApp.errors;

public class AccountNotVerifiedException extends RuntimeException {
    public AccountNotVerifiedException() {
        super("Twoje konto nie zostało jeszcze aktywowane. Sprawdź swoją skrzynkę e-mail i kliknij link aktywacyjny.");
    }
}
