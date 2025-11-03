package com.example.simplenotes.controller;

import com.example.simplenotes.model.Note;
import com.example.simplenotes.repository.NoteRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NoteController {

    private final NoteRepository noteRepository;

    public NoteController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }
    @GetMapping
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }
    // Get active notes
    @GetMapping
    public List<Note> getNotes() {
        return noteRepository.findByTrashedFalse();
    }

    // Get trashed notes
    @GetMapping("/trash")
    public List<Note> getTrash() {
        return noteRepository.findByTrashedTrue();
    }

    // Create note
    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return noteRepository.save(note);
    }

    // Update note
    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note noteData) {
        Note note = noteRepository.findById(id).orElseThrow();
        note.setTitle(noteData.getTitle());
        note.setContent(noteData.getContent());
        return noteRepository.save(note);
    }

    // Soft delete
    @DeleteMapping("/{id}")
    public Note softDelete(@PathVariable Long id) {
        Note note = noteRepository.findById(id).orElseThrow();
        note.setTrashed(true);
        return noteRepository.save(note);
    }

    // Hard delete
    @DeleteMapping("/trash/{id}")
    public void hardDelete(@PathVariable Long id) {
        noteRepository.deleteById(id);
    }
}
