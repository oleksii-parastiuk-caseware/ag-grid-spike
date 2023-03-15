## PrimeNG

### Advantages

- Has virtualization out of the box
- Supports tree hierarchy
- Supports drag and drop (internal, external)
- Allows manual assignment (click, no drag)

### Disadvantages

- Questionable library quality (not all components are technically functioning properly)
- Project looks undermaintained (certain known issues are not being fixed for a long time)

---

## AG Grid

### Advantages

- Has virtualization out of the box
- Supports tree hierarchy
- Suports drag and drop (internal, external)
- Allows manual assignment (click, no drag)
- Has search and filter functionality built in
- Has select all functionality built in

### Disadvantages

- Contains a lot of functionality that is not going to be used
- Design is absent (Ag grid could be styled to look the same as current design)
- Some additional time will be needed for developers to learn ag grid (the team has no prior experience with this library)
- Will require writing custom styles

---

### Conclusion

Both PrimeNG and AG Grid allow to solve UX problems. PrimeNG is easier to pick up and start development.
It also has partially ready design. Quality of the library is questionable, but all the required functionality
is supported or could be developed with minor fixes for the library components
(search, filter, sorting must be developed from scratch, tree hierarchy has known bug, that should be fixed).

Ag grid offers a lot more functionality out of the box (search, filter, select all, sort).
It will require additional time for the team to learn it. But, this time will be compensated by built in functionality.
Ag grid does not have a design yet. But, Ag grid could be styled to look like current UX solution.

The amount of effort to solve the UX problems by using AG grid or PrimeNG is expected to be same.
