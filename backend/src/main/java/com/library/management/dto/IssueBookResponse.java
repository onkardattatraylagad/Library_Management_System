package com.library.management.dto;

import com.library.management.enums.IssueStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueBookResponse {

    private Long issueId;
    private Long userId;
    private Long bookId;
    private String userName;
    private String bookTitle;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private IssueStatus status;
}
