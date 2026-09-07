package com.library.management.entity;

import com.library.management.enums.BookStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Author is required")
    @Column(nullable = false)
    private String author;

    @NotBlank(message = "Category is required")
    @Column(nullable = false)
    private String category;

    @NotBlank(message = "ISBN is required")
    @Column(nullable = false, unique = true)
    private String isbn;

    @NotNull(message = "Total quantity is required")
    @Min(value = 0, message = "Total quantity cannot be negative")
    @Column(nullable = false)
    private Integer totalQuantity;

    @NotNull(message = "Available quantity is required")
    @Min(value = 0, message = "Available quantity cannot be negative")
    @Column(nullable = false)
    private Integer availableQuantity;

    @Transient
    public BookStatus getStatus() {
        return availableQuantity != null && availableQuantity > 0 ? BookStatus.AVAILABLE : BookStatus.OUT_OF_STOCK;
    }
}
