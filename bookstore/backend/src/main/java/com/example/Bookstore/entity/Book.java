package com.example.Bookstore.entity;

import lombok.*;
import javax.persistence.*;
@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor


public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String isbn;

    @Column(nullable = false)
    private int publishedYear;
    
}
