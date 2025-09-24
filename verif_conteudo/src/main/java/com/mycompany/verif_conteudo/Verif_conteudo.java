package com.mycompany.verif_conteudo;
import java.util.Scanner;

public class Verif_conteudo {


    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite uma frase: ");
        String frase = scanner.nextLine();

        System.out.print("Digite uma palavra: ");
        String palavra = scanner.nextLine();

        if (frase.contains(palavra)) {
            System.out.println("A palavra '" + palavra + "' está contida na frase.");
        } else {
            System.out.println("A palavra '" + palavra + "' não está contida na frase.");
        }

        scanner.close();
    }
}
