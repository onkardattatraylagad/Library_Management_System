package com.library.management.config;

import com.library.management.entity.Book;
import com.library.management.entity.User;
import com.library.management.enums.Role;
import com.library.management.repository.BookRepository;
import com.library.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Bean
    CommandLineRunner seedLibraryData() {
        return args -> {
            String[] names = {"Aarav Sharma", "Ananya Patel", "Rohan Mehta", "Isha Gupta", "Vivaan Shah", "Diya Joshi", "Arjun Nair", "Meera Rao", "Kabir Singh", "Sara Khan"};
            for (int i = 0; i < names.length; i++) {
                String email = "student" + (i + 1) + "@library.com";
                if (userRepository.findByEmail(email).isEmpty()) {
                    userRepository.save(new User(null, names[i], email, "student123", Role.STUDENT));
                }
            }

            String[][] books = {
                    {"The Java Programming Language", "James Gosling", "Technology", "9780134685991"},
                    {"Clean Code", "Robert C. Martin", "Software Engineering", "9780132350884"},
                    {"Introduction to Algorithms", "Thomas H. Cormen", "Computer Science", "9780262033848"},
                    {"Atomic Habits", "James Clear", "Self Improvement", "9780735211292"},
                    {"The Alchemist", "Paulo Coelho", "Fiction", "9780061122411"},
                    {"Deep Work", "Cal Newport", "Productivity", "9781455586691"},
                    {"Design Patterns", "Erich Gamma", "Technology", "9780201633610"},
                    {"Database System Concepts", "Abraham Silberschatz", "Database", "9780078022159"},
                    {"The Pragmatic Programmer", "David Thomas", "Technology", "9780135957059"},
                    {"Refactoring", "Martin Fowler", "Software Engineering", "9780134757599"}
            };
            for (String[] book : books) {
                if (bookRepository.findByIsbn(book[3]).isEmpty()) {
                    bookRepository.save(new Book(null, book[0], book[1], book[2], book[3], 5, 5));
                }
            }
        };
    }
}
