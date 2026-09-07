package com.library.management.dto;

import com.library.management.enums.BookStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {

    private Long id;
    private String title;
    private String author;
    private String category;
    private String isbn;
    private Integer totalQuantity;
    private Integer availableQuantity;
    private BookStatus status;
}
