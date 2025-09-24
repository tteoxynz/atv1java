package com.mycompany.covers_maisc_minsc;

import java.util.Scanner;

public class Covers_maisc_minsc {

    public static void main(String[] args) {
      
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite uma palavra ou frase: ");
        String texto = scanner.nextLine();
 
        String maiusculas = texto.toUpperCase();
        String minusculas = texto.toLowerCase();

        System.out.println("Em maiúsculas: " + maiusculas);
        System.out.println("Em minúsculas: " + minusculas);

        scanner.close();
    }
}

