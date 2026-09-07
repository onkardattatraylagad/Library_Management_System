package com.library.management.service;

import com.library.management.dto.DashboardSummaryDto;
import com.library.management.enums.IssueStatus;
import com.library.management.enums.Role;
import com.library.management.repository.BookRepository;
import com.library.management.repository.IssuedBookRepository;
import com.library.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final IssuedBookRepository issuedBookRepository;

    public DashboardSummaryDto getDashboardSummary() {
        DashboardSummaryDto summary = new DashboardSummaryDto();
        summary.setTotalBooks(bookRepository.count());
        summary.setTotalAvailableBooks(bookRepository.getTotalAvailableQuantity());
        summary.setTotalIssuedBooks(issuedBookRepository.countByStatus(IssueStatus.ISSUED));
        summary.setTotalStudents(userRepository.countByRole(Role.STUDENT));
        summary.setTotalAdmins(userRepository.countByRole(Role.ADMIN));
        return summary;
    }
}
