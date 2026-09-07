package com.library.management.controller;

import com.library.management.dto.BookDto;
import com.library.management.dto.BookRequestDto;
import com.library.management.entity.Book;
import com.library.management.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @PostMapping
    public ResponseEntity<BookDto> createBook(@Valid @RequestBody BookRequestDto request) {
        Book book = bookService.createBook(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(toDto(book));
    }

    @GetMapping
    public List<BookDto> getAllBooks() {
        return bookService.getAllBooks().stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public BookDto getBookById(@PathVariable Long id) {
        return toDto(bookService.getBookById(id));
    }

    @GetMapping("/search")
    public List<BookDto> searchBooks(@RequestParam String keyword) {
        return bookService.searchBooks(keyword).stream().map(this::toDto).toList();
    }

    @PutMapping("/{id}")
    public BookDto updateBook(@PathVariable Long id, @Valid @RequestBody BookRequestDto request) {
        return toDto(bookService.updateBook(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    private BookDto toDto(Book book) {
        BookDto dto = new BookDto();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setCategory(book.getCategory());
        dto.setIsbn(book.getIsbn());
        dto.setTotalQuantity(book.getTotalQuantity());
        dto.setAvailableQuantity(book.getAvailableQuantity());
        dto.setStatus(book.getStatus());
        return dto;
    }
}
