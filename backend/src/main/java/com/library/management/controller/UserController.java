package com.library.management.controller;

import com.library.management.dto.UserDto;
import com.library.management.entity.User;
import com.library.management.enums.Role;
import com.library.management.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
        User savedUser = userService.createUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(toDto(savedUser));
    }

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers().stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable Long id) {
        return toDto(userService.getUserById(id));
    }

    @GetMapping("/role/{role}")
    public List<UserDto> getUsersByRole(@PathVariable Role role) {
        return userService.getUsersByRole(role).stream().map(this::toDto).toList();
    }

    private UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole());
        return dto;
    }
}
