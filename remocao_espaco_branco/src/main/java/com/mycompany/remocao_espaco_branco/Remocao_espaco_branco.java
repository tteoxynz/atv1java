package com.mycompany.remocao_espaco_branco;
import java.util.Scanner;

public class Remocao_espaco_branco {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite seu nome completo: ");
        String nomeCompleto = scanner.nextLine();

        String nomeLimpo = nomeCompleto.trim();

        System.out.println("Nome sem espaços no início e no fim: '" + nomeLimpo + "'");

        scanner.close();
    }
}
