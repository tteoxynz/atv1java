
package com.mycompany.substituicao_caracteres;
import java.util.Scanner;

public class Substituicao_caracteres {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite uma frase: ");
        String frase = scanner.nextLine();

        String fraseModificada = frase.replace('a', 'e');

        System.out.println("Frase modificada: " + fraseModificada);

        scanner.close();
    }
}