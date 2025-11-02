package com.example.simplenotes.controller;

import com.example.simplenotes.model.Note;
import com.example.simplenotes.repository.NoteRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {

    private final NoteRepository repo;

    public NoteController(NoteRepository repo) {
        this.repo = repo;
    }

    // ✅ Get all active notes
    @GetMapping
    public List<Note> getAllNotes() {
        return repo.findByTrashedFalse();
    }

    // ✅ Get all trashed notes
    @GetMapping("/trash")
    public List<Note> getTrashedNotes() {
        return repo.findByTrashedTrue();
    }

    // ✅ Add note
    @PostMapping
    public Note addNote(@RequestBody Note note) {
        note.setId(null);
        return repo.save(note);
    }

    // ✅ Update note
    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note updatedNote) {
        return repo.findById(id).map(note -> {
            note.setTitle(updatedNote.getTitle());
            note.setContent(updatedNote.getContent());
            return repo.save(note);
        }).orElseThrow();
    }

    // ✅ Move to Trash
    @DeleteMapping("/{id}")
    public void moveToTrash(@PathVariable Long id) {
        repo.findById(id).ifPresent(note -> {
            note.setTrashed(true);
            repo.save(note);
        });
    }

    // ✅ Restore from Trash
    @PutMapping("/restore/{id}")
    public void restoreFromTrash(@PathVariable Long id) {
        repo.findById(id).ifPresent(note -> {
            note.setTrashed(false);
            repo.save(note);
        });
    }

    // ✅ Permanently delete
    @DeleteMapping("/trash/{id}")
    public void deleteForever(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
