package com.library.management.service;

import com.library.management.dto.BookDto;
import com.library.management.dto.BookRequestDto;
import com.library.management.entity.Book;
import com.library.management.enums.BookStatus;
import com.library.management.exception.DuplicateResourceException;
import com.library.management.exception.ResourceNotFoundException;
import com.library.management.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public Book createBook(BookRequestDto request) {
        validateBookRequest(request);

        if (bookRepository.findByIsbn(request.getIsbn()).isPresent()) {
            throw new DuplicateResourceException("Book with ISBN already exists: " + request.getIsbn());
        }

        Book book = new Book();
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setCategory(request.getCategory());
        book.setIsbn(request.getIsbn());
        book.setTotalQuantity(request.getTotalQuantity());
        book.setAvailableQuantity(request.getAvailableQuantity());

        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
    }

    public Book updateBook(Long id, BookRequestDto request) {
        validateBookRequest(request);

        Book existingBook = getBookById(id);
        if (!existingBook.getIsbn().equalsIgnoreCase(request.getIsbn())
                && bookRepository.findByIsbn(request.getIsbn()).isPresent()) {
            throw new DuplicateResourceException("Book with ISBN already exists: " + request.getIsbn());
        }

        existingBook.setTitle(request.getTitle());
        existingBook.setAuthor(request.getAuthor());
        existingBook.setCategory(request.getCategory());
        existingBook.setIsbn(request.getIsbn());
        existingBook.setTotalQuantity(request.getTotalQuantity());
        existingBook.setAvailableQuantity(request.getAvailableQuantity());

        return bookRepository.save(existingBook);
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new ResourceNotFoundException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }

    public List<Book> searchBooks(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllBooks();
        }
        return bookRepository.searchByKeyword(keyword.trim());
    }

    public BookDto toDto(Book book) {
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

    private void validateBookRequest(BookRequestDto request) {
        if (request.getTotalQuantity() == null || request.getAvailableQuantity() == null) {
            throw new IllegalArgumentException("Total quantity and available quantity are required");
        }
        if (request.getTotalQuantity() < 0) {
            throw new IllegalArgumentException("Total quantity cannot be negative");
        }
        if (request.getAvailableQuantity() < 0) {
            throw new IllegalArgumentException("Available quantity cannot be negative");
        }
        if (request.getAvailableQuantity() > request.getTotalQuantity()) {
            throw new IllegalArgumentException("Available quantity cannot exceed total quantity");
        }
    }
}
