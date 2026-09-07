package com.library.management.service;

import com.library.management.dto.IssueBookRequest;
import com.library.management.entity.Book;
import com.library.management.entity.IssuedBook;
import com.library.management.entity.User;
import com.library.management.enums.IssueStatus;
import com.library.management.enums.Role;
import com.library.management.exception.InvalidIssueRequestException;
import com.library.management.exception.ResourceNotFoundException;
import com.library.management.repository.BookRepository;
import com.library.management.repository.IssuedBookRepository;
import com.library.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class IssueBookService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final IssuedBookRepository issuedBookRepository;

    @Transactional
    public IssuedBook issueBook(IssueBookRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));

        if (!Role.STUDENT.equals(user.getRole())) {
            throw new InvalidIssueRequestException("Only students can issue books.");
        }

        Book book = bookRepository.findByIdForUpdate(request.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + request.getBookId()));

        if (book.getAvailableQuantity() == null || book.getAvailableQuantity() <= 0) {
            throw new InvalidIssueRequestException("Book is unavailable at the moment.");
        }

        if (issuedBookRepository.existsByUserIdAndBookIdAndStatus(user.getId(), book.getId(), IssueStatus.ISSUED)) {
            throw new InvalidIssueRequestException("This student already has this book issued.");
        }

        IssuedBook issuedBook = new IssuedBook();
        issuedBook.setUser(user);
        issuedBook.setBook(book);
        issuedBook.setIssueDate(LocalDate.now());
        issuedBook.setDueDate(request.getDueDate());
        issuedBook.setStatus(IssueStatus.ISSUED);

        book.setAvailableQuantity(book.getAvailableQuantity() - 1);
        issuedBookRepository.save(issuedBook);
        bookRepository.save(book);

        return issuedBook;
    }

    @Transactional
    public IssuedBook returnBook(Long issueId) {
        IssuedBook issuedBook = issuedBookRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue record not found with id: " + issueId));

        if (!IssueStatus.ISSUED.equals(issuedBook.getStatus())) {
            throw new InvalidIssueRequestException("This book is not currently issued and cannot be returned.");
        }

        Book book = bookRepository.findByIdForUpdate(issuedBook.getBook().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + issuedBook.getBook().getId()));

        if (book.getAvailableQuantity() == null) {
            book.setAvailableQuantity(0);
        }

        int updatedAvailableQuantity = book.getAvailableQuantity() + 1;
        if (updatedAvailableQuantity > book.getTotalQuantity()) {
            throw new InvalidIssueRequestException("Available quantity cannot exceed total quantity.");
        }

        book.setAvailableQuantity(updatedAvailableQuantity);
        issuedBook.setReturnDate(LocalDate.now());
        issuedBook.setStatus(IssueStatus.RETURNED);

        bookRepository.save(book);
        return issuedBookRepository.save(issuedBook);
    }
}
