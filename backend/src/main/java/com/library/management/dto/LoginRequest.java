package com.library.management.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginRequest {
    @NotBlank(message = "Admin ID is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;
}
