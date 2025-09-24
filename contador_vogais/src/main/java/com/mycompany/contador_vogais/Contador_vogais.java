package com.mycompany.contador_vogais;
import java.util.Scanner;

public class Contador_vogais {
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite uma frase: ");
        String frase = scanner.nextLine();

        frase = frase.toLowerCase();

        int contadorVogais = 0;

        for (int i = 0; i < frase.length(); i++) {
            char caractere = frase.charAt(i);

            if (caractere == 'a' || caractere == 'e' || caractere == 'i' || caractere == 'o' || caractere == 'u') {
                contadorVogais++;
            }
        }

        System.out.println("A frase possui " + contadorVogais + " vogais.");


        scanner.close();
    }
}

