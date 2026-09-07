package com.library.management.controller;

import com.library.management.dto.IssueBookRequest;
import com.library.management.dto.IssueBookResponse;
import com.library.management.entity.IssuedBook;
import com.library.management.service.IssueBookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueBookService issueBookService;

    @PostMapping
    public ResponseEntity<IssueBookResponse> createIssue(@Valid @RequestBody IssueBookRequest request) {
        IssuedBook issuedBook = issueBookService.issueBook(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(issuedBook));
    }

    @PutMapping("/{issueId}/return")
    public ResponseEntity<IssueBookResponse> returnBook(@PathVariable Long issueId) {
        IssuedBook issuedBook = issueBookService.returnBook(issueId);
        return ResponseEntity.ok(toResponse(issuedBook));
    }

    private IssueBookResponse toResponse(IssuedBook issuedBook) {
        IssueBookResponse response = new IssueBookResponse();
        response.setIssueId(issuedBook.getId());
        response.setUserId(issuedBook.getUser().getId());
        response.setBookId(issuedBook.getBook().getId());
        response.setUserName(issuedBook.getUser().getName());
        response.setBookTitle(issuedBook.getBook().getTitle());
        response.setIssueDate(issuedBook.getIssueDate());
        response.setDueDate(issuedBook.getDueDate());
        response.setReturnDate(issuedBook.getReturnDate());
        response.setStatus(issuedBook.getStatus());
        return response;
    }
}
