package com.mycompany.atv1java;
import java.util.Scanner;

public class Atv1java {

    public static void main(String[] args) {
       
        Scanner scanner = new Scanner(System.in);
       
        System.out.println("Por favor, digite uma frase:");
       
        String frase = scanner.nextLine();
       
        int numeroDeCaracteres = frase.length();
       
        System.out.println("A frase que você digitou tem " + numeroDeCaracteres + " caracteres (incluindo espaços).");
        scanner.close();
    }
}
