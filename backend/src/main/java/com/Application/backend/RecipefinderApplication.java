package com.Application.backend;

import com.Application.backend.config.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class RecipefinderApplication {
	public static void main(String[] args) {
		SpringApplication.run(RecipefinderApplication.class, args);
	}
}
