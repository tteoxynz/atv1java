package com.mycompany.gerador_iniciais;

import java.util.Scanner;

public class Gerador_iniciais {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite seu nome completo: ");
        String nomeCompleto = scanner.nextLine();

        String[] partesDoNome = nomeCompleto.split(" ");

        StringBuilder iniciais = new StringBuilder();

        for (String parte : partesDoNome) {
            if (!parte.isEmpty()) {
                iniciais.append(parte.charAt(0));
            }
        }

        System.out.println("Iniciais: " + iniciais.toString().toUpperCase());

        scanner.close();
    }
}