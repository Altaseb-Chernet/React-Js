package com.example.simplenotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.example.simplenotes.model.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
     List<Note> findByTrashedFalse();
    List<Note> findByTrashedTrue();
}
