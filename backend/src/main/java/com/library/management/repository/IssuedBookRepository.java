package com.library.management.repository;

import com.library.management.entity.IssuedBook;
import com.library.management.enums.IssueStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssuedBookRepository extends JpaRepository<IssuedBook, Long> {
    boolean existsByUserIdAndBookIdAndStatus(Long userId, Long bookId, IssueStatus status);
    long countByStatus(IssueStatus status);
}
