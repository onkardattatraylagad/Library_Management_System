package com.library.management.exception;

public class InvalidIssueRequestException extends RuntimeException {
    public InvalidIssueRequestException(String message) {
        super(message);
    }
}
