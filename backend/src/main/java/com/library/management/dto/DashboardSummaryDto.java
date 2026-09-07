package com.library.management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryDto {

    private Long totalBooks;
    private Long totalAvailableBooks;
    private Long totalIssuedBooks;
    private Long totalStudents;
    private Long totalAdmins;
}
