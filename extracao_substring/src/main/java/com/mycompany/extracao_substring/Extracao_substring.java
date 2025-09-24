package com.mycompany.extracao_substring;
import java.util.Scanner;

public class Extracao_substring {


    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite uma frase: ");
        String frase = scanner.nextLine();

        if (frase.length() >= 5) {
            String primeirosCaracteres = frase.substring(0, 5);
            System.out.println("Os 5 primeiros caracteres da frase são: " + primeirosCaracteres);
        } else {
            System.out.println("A frase tem menos de 5 caracteres.");
        }

        scanner.close();
    }
}
