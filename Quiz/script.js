/**
 * Easy Game – Online Quiz Platform
 * B.Tech CSE-DS College Project
 * Pure Vanilla JavaScript (Client-Side Only)
 * 
 * Features:
 * - Comprehensive Question Database (8 Subjects, 100+ Curated Technical Questions)
 * - Randomized Questions and Options (Fisher-Yates Algorithm)
 * - Countdown Timer with Warning States & Auto-Submit
 * - State Management with LocalStorage
 * - Real-Time Validation & User Feedback
 * - Detailed Result Calculation & Answer Review with Explanations
 * - Interactive Leaderboard with Filtering & Clearing
 * - Persistent Dark/Light Mode
 */

// =============================================================================
// 1. QUESTION DATABASE (100+ B.Tech CSE-DS Curated Questions)
// =============================================================================

const questionsDB = [
  // ---------------------------------------------------------------------------
  // C Programming
  // ---------------------------------------------------------------------------
  {
    subject: "C Programming",
    difficulty: "Easy",
    question: "Which of the following is the correct format specifier for a double variable in printf()?",
    options: ["%d", "%f", "%lf", "%s"],
    correctAnswer: 2,
    explanation: "%lf (long float) is used to specify double precision floating-point numbers in C standard library I/O."
  },
  {
    subject: "C Programming",
    difficulty: "Easy",
    question: "What does the 'sizeof' operator in C return?",
    options: ["Size in bits", "Size in bytes", "Number of characters", "Address of variable"],
    correctAnswer: 1,
    explanation: "The sizeof operator returns the total storage size in bytes required for an operand or data type."
  },
  {
    subject: "C Programming",
    difficulty: "Easy",
    question: "Which library function is used to dynamically allocate memory in C without initializing it?",
    options: ["calloc()", "malloc()", "realloc()", "free()"],
    correctAnswer: 1,
    explanation: "malloc() allocates specified bytes of memory from the heap and leaves memory uninitialized (contains garbage values)."
  },
  {
    subject: "C Programming",
    difficulty: "Medium",
    question: "What will happen if you dereference a NULL pointer in C?",
    options: ["Returns 0", "Compilation error", "Undefined behavior / Segmentation fault", "Memory leak"],
    correctAnswer: 2,
    explanation: "Dereferencing a NULL pointer leads to undefined behavior, which on most modern operating systems triggers a segmentation fault (SIGSEGV)."
  },
  {
    subject: "C Programming",
    difficulty: "Medium",
    question: "Which storage class specifies that a variable retains its value between function calls?",
    options: ["auto", "register", "static", "extern"],
    correctAnswer: 2,
    explanation: "The 'static' storage class instructs the compiler to keep a local variable in existence during the life-time of the program."
  },
  {
    subject: "C Programming",
    difficulty: "Medium",
    question: "What is the output of the expression '5 >> 1' in C?",
    options: ["10", "2", "2.5", "4"],
    correctAnswer: 1,
    explanation: "Bitwise right shift by 1 effectively divides an integer by 2 with truncation. 5 (0101) shifted right becomes 2 (0010)."
  },
  {
    subject: "C Programming",
    difficulty: "Hard",
    question: "In C, what is the type of the string literal \"Hello\"?",
    options: ["char*", "const char*", "char[6]", "const char[6]"],
    correctAnswer: 2,
    explanation: "In C (unlike C++), string literals are technically arrays of non-const characters, char[6] (including the null terminator '\\0'), though modifying them causes undefined behavior."
  },
  {
    subject: "C Programming",
    difficulty: "Hard",
    question: "What is a 'dangling pointer' in C?",
    options: [
      "A pointer that points to NULL",
      "A pointer pointing to a memory location that has been deleted or freed",
      "An uninitialized pointer",
      "A pointer pointing to another pointer"
    ],
    correctAnswer: 1,
    explanation: "A dangling pointer arises when an object is deleted or de-allocated, without modifying the value of the pointer, so the pointer still points to invalid memory."
  },
  {
    subject: "C Programming",
    difficulty: "Hard",
    question: "Which preprocessor directive is used to prevent double inclusion of header files in C?",
    options: ["#include_once", "#ifndef / #define", "#pragma lock", "#import"],
    correctAnswer: 1,
    explanation: "Include guards using '#ifndef HEADER_NAME_H', '#define HEADER_NAME_H', and '#endif' prevent multiple definitions during preprocessing."
  },
  {
    subject: "C Programming",
    difficulty: "Medium",
    question: "What is the return type of the 'malloc()' function in C before typecasting?",
    options: ["int*", "char*", "void*", "null*"],
    correctAnswer: 2,
    explanation: "malloc() returns a generic pointer of type 'void*' which can be implicitly or explicitly converted to any pointer type."
  },
  {
    subject: "C Programming",
    difficulty: "Easy",
    question: "Which header file is required to use the printf() and scanf() functions in C?",
    options: ["<stdlib.h>", "<stdio.h>", "<conio.h>", "<string.h>"],
    correctAnswer: 1,
    explanation: "<stdio.h> stands for Standard Input Output header and declares core I/O functions."
  },
  {
    subject: "C Programming",
    difficulty: "Hard",
    question: "What does the 'volatile' keyword tell the C compiler?",
    options: [
      "The variable is stored in CPU registers",
      "The variable value may change unexpectedly, so do not optimize accesses",
      "The variable cannot be modified after declaration",
      "The variable is accessible across multiple threads automatically"
    ],
    correctAnswer: 1,
    explanation: "Volatile instructs the compiler to reload the variable from memory on every reference rather than caching it in CPU registers."
  },

  // ---------------------------------------------------------------------------
  // Python
  // ---------------------------------------------------------------------------
  {
    subject: "Python",
    difficulty: "Easy",
    question: "Which keyword is used to define a function in Python?",
    options: ["function", "def", "func", "define"],
    correctAnswer: 1,
    explanation: "In Python, the 'def' keyword introduces a function definition followed by the function name and parameter list."
  },
  {
    subject: "Python",
    difficulty: "Easy",
    question: "Which built-in Python data type is immutable?",
    options: ["list", "dict", "set", "tuple"],
    correctAnswer: 3,
    explanation: "Tuples and strings are immutable in Python; once created, their elements cannot be reassigned or modified in place."
  },
  {
    subject: "Python",
    difficulty: "Easy",
    question: "What is the output of bool([]) in Python?",
    options: ["True", "False", "None", "TypeError"],
    correctAnswer: 1,
    explanation: "Empty sequences such as lists [], strings '', and dicts {} evaluate to False in a boolean context in Python."
  },
  {
    subject: "Python",
    difficulty: "Medium",
    question: "What does the 'yield' keyword do inside a Python function?",
    options: [
      "Terminates the program",
      "Turns the function into a generator that returns an iterator",
      "Imports an external module dynamically",
      "Locks the thread execution"
    ],
    correctAnswer: 1,
    explanation: "Using 'yield' produces a value and suspends function execution, making it a generator that generates values on demand."
  },
  {
    subject: "Python",
    difficulty: "Medium",
    question: "What is the time complexity of looking up a key in a Python dictionary (average case)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 0,
    explanation: "Python dictionaries are implemented using hash tables, offering amortized O(1) average time complexity for key lookup."
  },
  {
    subject: "Python",
    difficulty: "Medium",
    question: "What is the purpose of the '__init__' method in Python classes?",
    options: [
      "To initialize class variables globally",
      "As a constructor to initialize newly created object attributes",
      "To delete an object instance",
      "To convert an object to a string representation"
    ],
    correctAnswer: 1,
    explanation: "'__init__' is the initializer method automatically invoked when a new instance of a class is created."
  },
  {
    subject: "Python",
    difficulty: "Hard",
    question: "What is the Global Interpreter Lock (GIL) in CPython?",
    options: [
      "A security mechanism preventing unauthorized file access",
      "A mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at once",
      "A compiler lock for optimizing list comprehensions",
      "A network socket firewall built into Python"
    ],
    correctAnswer: 1,
    explanation: "The GIL is a mutex in CPython that allows only one thread to execute Python bytecode at a time, impacting CPU-bound multithreading."
  },
  {
    subject: "Python",
    difficulty: "Hard",
    question: "What will be the output of `[x for x in [1, 2, 3] if x > 1]`?",
    options: ["[1, 2, 3]", "[2, 3]", "[1]", "[]"],
    correctAnswer: 1,
    explanation: "The list comprehension filters elements where x > 1, preserving 2 and 3 in the resulting list."
  },
  {
    subject: "Python",
    difficulty: "Hard",
    question: "In Python, how is method resolution order (MRO) computed for multiple inheritance?",
    options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "C3 Linearization Algorithm", "Random Order"],
    correctAnswer: 2,
    explanation: "Python uses the C3 Linearization (or C3 superclasses linearization) algorithm to maintain monotonic method resolution order."
  },
  {
    subject: "Python",
    difficulty: "Easy",
    question: "Which of the following creates a virtual environment in modern Python?",
    options: ["python -m venv myenv", "python --make-env myenv", "create-env myenv", "python virtualenv:new"],
    correctAnswer: 0,
    explanation: "'python -m venv <directory>' is Python's standard library module for creating lightweight isolated virtual environments."
  },
  {
    subject: "Python",
    difficulty: "Medium",
    question: "What does the '*' operator before parameter name in a function definition like 'def func(*args)' do?",
    options: [
      "Indicates pointer dereferencing",
      "Collects arbitrary positional arguments into a tuple",
      "Collects keyword arguments into a dictionary",
      "Multiplies the argument value"
    ],
    correctAnswer: 1,
    explanation: "*args packs excess positional arguments into a tuple, allowing functions to accept variable numbers of inputs."
  },
  {
    subject: "Python",
    difficulty: "Hard",
    question: "What is the difference between '==' and 'is' in Python?",
    options: [
      "'==' checks memory address, 'is' checks value equality",
      "'==' checks value equality, 'is' checks object identity (same memory address)",
      "Both are identical in Python",
      "'is' is only used for numerical values"
    ],
    correctAnswer: 1,
    explanation: "'==' checks if values of two objects are equal via __eq__, whereas 'is' checks if both variables point to the exact same object in memory."
  },

  // ---------------------------------------------------------------------------
  // Java
  // ---------------------------------------------------------------------------
  {
    subject: "Java",
    difficulty: "Easy",
    question: "Which component of the Java platform is responsible for executing Java bytecode?",
    options: ["JDK", "JRE", "JVM", "JIT"],
    correctAnswer: 2,
    explanation: "The JVM (Java Virtual Machine) loads, verifies, and executes Java bytecode on the host operating system."
  },
  {
    subject: "Java",
    difficulty: "Easy",
    question: "Which access modifier gives the widest accessibility in Java?",
    options: ["private", "protected", "default", "public"],
    correctAnswer: 3,
    explanation: "The 'public' access specifier allows classes, methods, and variables to be accessed from any package without restrictions."
  },
  {
    subject: "Java",
    difficulty: "Easy",
    question: "Can an abstract class in Java have constructors?",
    options: ["Yes", "No", "Only if it implements an interface", "Only in Java 17+"],
    correctAnswer: 0,
    explanation: "Yes, abstract classes can have constructors. They are called via 'super()' during subclass instantiation."
  },
  {
    subject: "Java",
    difficulty: "Medium",
    question: "Which of the following is NOT a checked exception in Java?",
    options: ["IOException", "SQLException", "NullPointerException", "ClassNotFoundException"],
    correctAnswer: 2,
    explanation: "NullPointerException inherits from RuntimeException, making it an unchecked exception that does not require mandatory catch or throws declaration."
  },
  {
    subject: "Java",
    difficulty: "Medium",
    question: "What is the default value of a boolean instance variable in a Java class?",
    options: ["true", "false", "null", "0"],
    correctAnswer: 1,
    explanation: "Boolean instance variables in Java default to 'false' if not explicitly initialized."
  },
  {
    subject: "Java",
    difficulty: "Medium",
    question: "Why are String objects immutable in Java?",
    options: [
      "To allow the use of String Constant Pool, thread safety, and secure hashing",
      "Because Java does not support pointers",
      "To limit memory usage to 64MB",
      "Because strings cannot be stored in the heap"
    ],
    correctAnswer: 0,
    explanation: "String immutability enables string interning (String Constant Pool), caching of hashCodes in collections like HashMap, and inherent thread safety."
  },
  {
    subject: "Java",
    difficulty: "Hard",
    question: "What is the time complexity of HashMap get() operation in Java 8+ during high hash collision?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
    correctAnswer: 1,
    explanation: "In Java 8+, when bucket collision reaches TREEIFY_THRESHOLD (8 items), linked lists convert to balanced red-black trees, improving worst-case lookup to O(log n)."
  },
  {
    subject: "Java",
    difficulty: "Hard",
    question: "What does the 'transient' keyword mean when applied to a variable in Java?",
    options: [
      "The variable is thread-local",
      "The variable will not be serialized during object serialization",
      "The variable is stored in volatile CPU cache",
      "The variable value is computed at compile time"
    ],
    correctAnswer: 1,
    explanation: "The transient modifier indicates that a field should be skipped when the containing object is serialized using Java Object Serialization."
  },
  {
    subject: "Java",
    difficulty: "Hard",
    question: "In Java's memory model, where are local primitive variables stored?",
    options: ["Heap memory", "Stack memory", "Metaspace", "Permanent Generation"],
    correctAnswer: 1,
    explanation: "Local primitive variables declared inside methods reside on the thread's call Stack memory, which is destroyed upon method exit."
  },
  {
    subject: "Java",
    difficulty: "Easy",
    question: "Which collection interface allows duplicate elements in Java?",
    options: ["Set", "List", "Map", "NavigableSet"],
    correctAnswer: 1,
    explanation: "The List interface (ArrayList, LinkedList) is an ordered collection that allows duplicate elements."
  },
  {
    subject: "Java",
    difficulty: "Medium",
    question: "What is the purpose of the 'finally' block in Java exception handling?",
    options: [
      "Executes only if an exception is caught",
      "Executes always, regardless of whether an exception occurred or was handled",
      "Prevents exceptions from propagating",
      "Terminates the JVM immediately"
    ],
    correctAnswer: 1,
    explanation: "The 'finally' block always executes after try-catch (except during System.exit() or JVM crash), commonly used for closing resources."
  },
  {
    subject: "Java",
    difficulty: "Hard",
    question: "What is the difference between Comparable and Comparator interfaces in Java?",
    options: [
      "Comparable provides natural sorting via compareTo(), Comparator allows custom sorting via compare()",
      "Comparable is in java.util, Comparator is in java.lang",
      "Comparable can sort multiple attributes, Comparator sorts only one",
      "Comparable is deprecated in modern Java"
    ],
    correctAnswer: 0,
    explanation: "Comparable (compareTo) imposes natural ordering on the implementing class, while Comparator (compare) allows external, multiple customizable sorting criteria."
  },

  // ---------------------------------------------------------------------------
  // DBMS
  // ---------------------------------------------------------------------------
  {
    subject: "DBMS",
    difficulty: "Easy",
    question: "What does ACID stand for in database transaction management?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Access, Control, Integrity, Data",
      "Aggregation, Concurrency, Indexing, Distribution",
      "Accuracy, Completeness, Independence, Durability"
    ],
    correctAnswer: 0,
    explanation: "ACID properties (Atomicity, Consistency, Isolation, Durability) guarantee reliable transaction processing in database management systems."
  },
  {
    subject: "DBMS",
    difficulty: "Easy",
    question: "Which normal form requires removing partial functional dependencies on a composite primary key?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: 1,
    explanation: "Second Normal Form (2NF) mandates that the table must be in 1NF and no non-prime attribute is partially dependent on any candidate key."
  },
  {
    subject: "DBMS",
    difficulty: "Easy",
    question: "Which SQL clause is used to filter records resulting from an aggregate function?",
    options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
    correctAnswer: 1,
    explanation: "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions like SUM, AVG, COUNT."
  },
  {
    subject: "DBMS",
    difficulty: "Medium",
    question: "What is a Foreign Key in a relational database?",
    options: [
      "A primary key from an external foreign server",
      "An attribute in one table that references the Primary Key of another table to maintain referential integrity",
      "A key used exclusively for data encryption",
      "A secondary key that can never accept duplicate values"
    ],
    correctAnswer: 1,
    explanation: "A foreign key matches the candidate/primary key of another relation to enforce referential integrity."
  },
  {
    subject: "DBMS",
    difficulty: "Medium",
    question: "Which of the following anomalies is NOT solved by normalization?",
    options: ["Insertion anomaly", "Deletion anomaly", "Update anomaly", "Hardware failure anomaly"],
    correctAnswer: 3,
    explanation: "Normalization specifically resolves logical anomalies (Insertion, Deletion, Update). Hardware failure anomalies are handled by write-ahead logging and replication."
  },
  {
    subject: "DBMS",
    difficulty: "Medium",
    question: "What data structure is most widely used for indexing database records on disk?",
    options: ["Binary Search Tree", "B+ Tree", "Singly Linked List", "Min Heap"],
    correctAnswer: 1,
    explanation: "B+ Trees have high fan-out, shallow depth (few disk I/Os), and store all records in leaf nodes linked sequentially for fast range queries."
  },
  {
    subject: "DBMS",
    difficulty: "Hard",
    question: "What is the highest transaction isolation level in the SQL standard?",
    options: ["Read Committed", "Repeatable Read", "Serializable", "Read Uncommitted"],
    correctAnswer: 2,
    explanation: "Serializable is the highest isolation level, preventing dirty reads, non-repeatable reads, and phantom reads entirely."
  },
  {
    subject: "DBMS",
    difficulty: "Hard",
    question: "What does the Write-Ahead Logging (WAL) protocol dictate?",
    options: [
      "Log records must be written to stable storage before corresponding data pages are flushed to disk",
      "Logs are written only after transactions commit to disk",
      "All reads must be logged before writes",
      "Logs are cleared whenever cache is updated"
    ],
    correctAnswer: 0,
    explanation: "WAL ensures durability and atomicity by requiring that log records describing changes are flushed to stable storage before the dirty data pages reach disk."
  },
  {
    subject: "DBMS",
    difficulty: "Hard",
    question: "Under what condition is a relation considered in Boyce-Codd Normal Form (BCNF)?",
    options: [
      "If every functional dependency X -> Y has X as a superkey",
      "If there are no multi-valued dependencies",
      "If transitive dependencies only apply to composite keys",
      "If it contains no NULL values"
    ],
    correctAnswer: 0,
    explanation: "A table is in BCNF if for every non-trivial functional dependency X -> Y, X is a superkey of the table."
  },
  {
    subject: "DBMS",
    difficulty: "Easy",
    question: "Which SQL command is classified as Data Definition Language (DDL)?",
    options: ["SELECT", "INSERT", "ALTER", "UPDATE"],
    correctAnswer: 2,
    explanation: "ALTER is a DDL command because it modifies the database schema/structure rather than the row data."
  },
  {
    subject: "DBMS",
    difficulty: "Medium",
    question: "What is a clustered index in a relational database?",
    options: [
      "An index that dictates the actual physical order of data rows on disk",
      "An index created across multiple tables simultaneously",
      "A hash-based non-ordered secondary index",
      "An index stored entirely in volatile memory"
    ],
    correctAnswer: 0,
    explanation: "A clustered index sorts and stores the data rows in the table or view based on its key values, meaning only one clustered index can exist per table."
  },
  {
    subject: "DBMS",
    difficulty: "Hard",
    question: "In transaction concurrency, what is a 'Phantom Read'?",
    options: [
      "A transaction reads data that has not yet been committed",
      "A transaction reads the same row twice and gets different column values",
      "A transaction re-executes a range query and finds rows that were inserted by another committed transaction",
      "A transaction reads deleted records from disk cache"
    ],
    correctAnswer: 2,
    explanation: "A phantom read occurs when a transaction queries a range of rows and a concurrent transaction inserts new qualifying rows, causing the count to change on re-read."
  },

  // ---------------------------------------------------------------------------
  // Operating System
  // ---------------------------------------------------------------------------
  {
    subject: "Operating System",
    difficulty: "Easy",
    question: "Which of the following is NOT one of the four Coffman conditions for deadlock?",
    options: ["Mutual Exclusion", "Hold and Wait", "No Preemption", "Paging"],
    correctAnswer: 3,
    explanation: "The four Coffman conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Paging is a memory management technique."
  },
  {
    subject: "Operating System",
    difficulty: "Easy",
    question: "What is the main purpose of the Operating System's CPU Scheduler?",
    options: [
      "To allocate RAM memory to disk files",
      "To select which process in the ready queue is allocated CPU time",
      "To manage keyboard and mouse interrupts",
      "To scan executable binaries for viruses"
    ],
    correctAnswer: 1,
    explanation: "The CPU scheduler (short-term scheduler) selects from among the processes in the ready queue and allocates a CPU core to one of them."
  },
  {
    subject: "Operating System",
    difficulty: "Easy",
    question: "What is a 'Thread' in an Operating System?",
    options: [
      "A standalone operating system kernel",
      "The smallest unit of execution within a process sharing address space",
      "A hardware bus connecting the CPU to memory",
      "A persistent storage sector on disk"
    ],
    correctAnswer: 1,
    explanation: "A thread is a lightweight execution unit within a process that shares code, data, and OS resources with sibling threads."
  },
  {
    subject: "Operating System",
    difficulty: "Medium",
    question: "What is 'Thrashing' in virtual memory systems?",
    options: [
      "Rapid CPU context switching between two kernel threads",
      "A state where the system spends more time servicing page faults than executing instructions",
      "Overheating of CPU cores during floating-point operations",
      "Continuous writing of cache lines to disk"
    ],
    correctAnswer: 1,
    explanation: "Thrashing occurs when memory is overcommitted, causing continuous page faults and disk I/O, degrading system throughput to near zero."
  },
  {
    subject: "Operating System",
    difficulty: "Medium",
    question: "Which CPU scheduling algorithm is preemptive and assigns each process a fixed time quantum?",
    options: ["First-Come, First-Served (FCFS)", "Shortest Job First (SJF)", "Round Robin (RR)", "Priority Scheduling (Non-preemptive)"],
    correctAnswer: 2,
    explanation: "Round Robin defines a fixed time quantum; when the quantum expires, the running process is preempted and returned to the ready queue."
  },
  {
    subject: "Operating System",
    difficulty: "Medium",
    question: "What is a Translation Lookaside Buffer (TLB)?",
    options: [
      "A hardware cache used to reduce the time taken to access virtual memory page translations",
      "A buffer for network packets in the NIC",
      "A register for floating-point calculations",
      "A disk sector buffer for database log files"
    ],
    correctAnswer: 0,
    explanation: "The TLB is a high-speed associative hardware cache in the MMU storing recent virtual-to-physical address mappings."
  },
  {
    subject: "Operating System",
    difficulty: "Hard",
    question: "What is Belady's Anomaly in page replacement algorithms?",
    options: [
      "Increasing page size decreases memory throughput",
      "For certain algorithms like FIFO, increasing the number of page frames results in an increase in page faults",
      "LRU performance degrades with large loop counters",
      "Virtual address space cannot exceed physical RAM size"
    ],
    correctAnswer: 1,
    explanation: "Belady's anomaly shows that with the FIFO page replacement algorithm, allocating more physical page frames can paradoxically increase total page faults."
  },
  {
    subject: "Operating System",
    difficulty: "Hard",
    question: "Which algorithm is used by the OS for Deadlock Avoidance?",
    options: ["Dijkstra's Banker's Algorithm", "Kruskal's Algorithm", "Floyd-Warshall Algorithm", "Huffman Algorithm"],
    correctAnswer: 0,
    explanation: "The Banker's Algorithm tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources."
  },
  {
    subject: "Operating System",
    difficulty: "Hard",
    question: "What is the difference between a Monolithic Kernel and a Microkernel?",
    options: [
      "Monolithic runs all OS services in kernel space; Microkernel runs core mechanisms in kernel space and services in user space",
      "Microkernels cannot handle hardware interrupts",
      "Monolithic kernels are only used on mobile phones",
      "Microkernels have higher memory requirements"
    ],
    correctAnswer: 0,
    explanation: "Monolithic kernels (Linux) run drivers and filesystems in privileged kernel space, while microkernels (Mach, QNX) keep kernel space minimal and run services in user space."
  },
  {
    subject: "Operating System",
    difficulty: "Easy",
    question: "Which system call in UNIX is used to create a new child process?",
    options: ["fork()", "exec()", "spawn()", "create_process()"],
    correctAnswer: 0,
    explanation: "The fork() system call creates an exact duplicate copy of the calling process as a new child process."
  },
  {
    subject: "Operating System",
    difficulty: "Medium",
    question: "What is a Counting Semaphore in process synchronization?",
    options: [
      "A semaphore that can only take values 0 and 1",
      "An integer variable used to control access to a finite number of shared resources",
      "A hardware register used for loop counters",
      "A tool for profiling process execution time"
    ],
    correctAnswer: 1,
    explanation: "A counting semaphore has a non-negative integer domain, representing the count of currently available resource instances."
  },
  {
    subject: "Operating System",
    difficulty: "Hard",
    question: "In memory management, what is 'Internal Fragmentation'?",
    options: [
      "Total free memory space is enough for a request, but it is not contiguous",
      "Allocated memory space is slightly larger than requested memory, wasting space inside the allocated partition",
      "Memory corruption caused by buffer overflows",
      "Virtual memory pages mapped to non-existent swap space"
    ],
    correctAnswer: 1,
    explanation: "Internal fragmentation occurs when fixed-sized blocks are allocated and the process data does not fill the entire allocated block."
  },

  // ---------------------------------------------------------------------------
  // Computer Networks
  // ---------------------------------------------------------------------------
  {
    subject: "Computer Networks",
    difficulty: "Easy",
    question: "How many layers are defined in the OSI Reference Model?",
    options: ["4", "5", "7", "8"],
    correctAnswer: 2,
    explanation: "The OSI model specifies 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application."
  },
  {
    subject: "Computer Networks",
    difficulty: "Easy",
    question: "Which transport layer protocol provides connection-oriented, reliable data delivery with congestion control?",
    options: ["UDP", "IP", "TCP", "ICMP"],
    correctAnswer: 2,
    explanation: "TCP (Transmission Control Protocol) is connection-oriented, guarantees in-order byte stream delivery, and provides flow & congestion control."
  },
  {
    subject: "Computer Networks",
    difficulty: "Easy",
    question: "What is the standard port number for HTTPS (Secure HTTP)?",
    options: ["80", "8080", "443", "22"],
    correctAnswer: 2,
    explanation: "Port 443 is the standard default port for HTTP traffic encrypted with TLS/SSL (HTTPS)."
  },
  {
    subject: "Computer Networks",
    difficulty: "Medium",
    question: "What is the purpose of the ARP (Address Resolution Protocol)?",
    options: [
      "To map an IP address to a physical MAC address on a local network segment",
      "To translate domain names to IP addresses",
      "To route packets between autonomous systems",
      "To encrypt data link frames"
    ],
    correctAnswer: 0,
    explanation: "ARP maps a 32-bit IPv4 address to a 48-bit physical MAC hardware address on local Ethernet segments."
  },
  {
    subject: "Computer Networks",
    difficulty: "Medium",
    question: "In IPv4 subnetting, how many usable host addresses are available in a /24 subnet?",
    options: ["256", "254", "255", "128"],
    correctAnswer: 1,
    explanation: "A /24 subnet has 2^(32-24) = 256 total addresses. Subtracting network address (all 0s) and broadcast address (all 1s) leaves 254 usable host addresses."
  },
  {
    subject: "Computer Networks",
    difficulty: "Medium",
    question: "Which protocol is used by the 'ping' command to test network reachability?",
    options: ["TCP", "UDP", "ICMP", "IGMP"],
    correctAnswer: 2,
    explanation: "Ping uses ICMP (Internet Control Message Protocol) Echo Request (Type 8) and Echo Reply (Type 0) packets."
  },
  {
    subject: "Computer Networks",
    difficulty: "Hard",
    question: "What are the three packets exchanged during a standard TCP Three-Way Handshake?",
    options: [
      "SYN, SYN-ACK, ACK",
      "ACK, SYN, FIN",
      "SYN, DATA, ACK",
      "PING, PONG, ACK"
    ],
    correctAnswer: 0,
    explanation: "The TCP handshake consists of: Client sends SYN -> Server replies with SYN-ACK -> Client responds with ACK."
  },
  {
    subject: "Computer Networks",
    difficulty: "Hard",
    question: "What mechanism is used by TCP for Congestion Avoidance?",
    options: [
      "Additive Increase Multiplicative Decrease (AIMD)",
      "Bellman-Ford algorithm",
      "Exponential backoff only without window adjustment",
      "Token Ring token passing"
    ],
    correctAnswer: 0,
    explanation: "TCP congestion avoidance employs AIMD: linearly increases congestion window (cwnd) per RTT until packet loss, then cuts cwnd multiplicatively (usually in half)."
  },
  {
    subject: "Computer Networks",
    difficulty: "Hard",
    question: "Which routing protocol is an exterior gateway protocol used to route traffic between Autonomous Systems (AS) on the global Internet?",
    options: ["OSPF", "RIP", "BGP", "IS-IS"],
    correctAnswer: 2,
    explanation: "BGP (Border Gateway Protocol) is the standardized exterior gateway path-vector protocol that drives routing decisions across the global Internet."
  },
  {
    subject: "Computer Networks",
    difficulty: "Easy",
    question: "Which device operates at the Network Layer (Layer 3) of the OSI model?",
    options: ["Hub", "Switch", "Router", "Repeater"],
    correctAnswer: 2,
    explanation: "Routers inspect network layer headers (IP addresses) to make forwarding decisions across different network boundaries."
  },
  {
    subject: "Computer Networks",
    difficulty: "Medium",
    question: "What is the primary role of DNS (Domain Name System)?",
    options: [
      "To translate human-friendly domain names into machine-readable IP addresses",
      "To dynamically assign IP addresses to clients on boot",
      "To establish end-to-end VPN tunnels",
      "To filter malicious packet headers at the gateway"
    ],
    correctAnswer: 0,
    explanation: "DNS functions as the Internet's directory service, translating human-friendly names (e.g. example.com) into numerical IP addresses."
  },
  {
    subject: "Computer Networks",
    difficulty: "Hard",
    question: "What is the purpose of the 'TIME_WAIT' state in TCP connection termination?",
    options: [
      "To allow new connections to immediately use the same port",
      "To ensure the remote host received the final ACK and let lingering delayed duplicate segments expire in the network",
      "To hold open bandwidth for reconnects",
      "To reset the TCP window size to maximum"
    ],
    correctAnswer: 1,
    explanation: "TIME_WAIT lasts for 2*MSL (Maximum Segment Lifetime) to ensure that the remote endpoint received the final ACK and to prevent old segments from being accepted by a new connection."
  },

  // ---------------------------------------------------------------------------
  // Data Structures
  // ---------------------------------------------------------------------------
  {
    subject: "Data Structures",
    difficulty: "Easy",
    question: "Which data structure operates on a Last-In, First-Out (LIFO) basis?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1,
    explanation: "A Stack follows the LIFO principle where the element added last is the first one removed."
  },
  {
    subject: "Data Structures",
    difficulty: "Easy",
    question: "What is the worst-case time complexity of searching an element in an unsorted array of size n?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    correctAnswer: 2,
    explanation: "In an unsorted array, linear search must check each element sequentially, resulting in O(n) worst-case time."
  },
  {
    subject: "Data Structures",
    difficulty: "Easy",
    question: "What is the primary advantage of a Doubly Linked List over a Singly Linked List?",
    options: [
      "Uses less memory",
      "Allows traversal in both forward and backward directions",
      "Guarantees O(1) arbitrary search",
      "Automatically maintains sorted order"
    ],
    correctAnswer: 1,
    explanation: "Doubly linked lists have both 'next' and 'prev' pointers, enabling bidirectional traversal and easy deletion of a given node."
  },
  {
    subject: "Data Structures",
    difficulty: "Medium",
    question: "What is the balance factor of a node in an AVL Tree?",
    options: [
      "Height of Left Subtree - Height of Right Subtree",
      "Number of Left Nodes - Number of Right Nodes",
      "Depth of node * Height of root",
      "Total nodes / 2"
    ],
    correctAnswer: 0,
    explanation: "In an AVL tree, the balance factor is defined as Height(Left Subtree) - Height(Right Subtree), and must remain within {-1, 0, +1}."
  },
  {
    subject: "Data Structures",
    difficulty: "Medium",
    question: "Which data structure is typically used to implement Breadth-First Search (BFS) in a graph?",
    options: ["Stack", "Queue", "Priority Queue", "Binary Search Tree"],
    correctAnswer: 1,
    explanation: "BFS explores vertices level by level, making a FIFO Queue the natural choice for scheduling discovered vertices."
  },
  {
    subject: "Data Structures",
    difficulty: "Medium",
    question: "What is the worst-case time complexity of inserting into a Max Heap of n elements?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 1,
    explanation: "Inserting an element appends it at the leaf level and percolates up (heapify up) through tree height, taking O(log n)."
  },
  {
    subject: "Data Structures",
    difficulty: "Hard",
    question: "What is the worst-case time complexity of searching in a standard Binary Search Tree (BST)?",
    options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
    correctAnswer: 1,
    explanation: "When a standard BST becomes degenerate (skewed like a linked list with sorted input), the tree height becomes n, yielding O(n) search."
  },
  {
    subject: "Data Structures",
    difficulty: "Hard",
    question: "Which collision resolution technique in hash tables maintains a linked list of elements that hash to the same bucket index?",
    options: ["Linear Probing", "Quadratic Probing", "Separate Chaining", "Double Hashing"],
    correctAnswer: 2,
    explanation: "Separate Chaining stores collisions in an auxiliary linked list (or balanced tree) anchored at each hash table bucket."
  },
  {
    subject: "Data Structures",
    difficulty: "Hard",
    question: "What is a 'Trie' (Prefix Tree) primarily optimized for?",
    options: [
      "Range sum queries over numeric arrays",
      "Fast prefix retrieval and string search operations",
      "Finding shortest paths in dense graphs",
      "Constant time matrix multiplication"
    ],
    correctAnswer: 1,
    explanation: "A Trie stores strings character by character along edges, allowing prefix lookups and autocomplete in O(L) time where L is key length."
  },
  {
    subject: "Data Structures",
    difficulty: "Easy",
    question: "What is the time complexity to insert a new element at the front of a Singly Linked List if head is known?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctAnswer: 0,
    explanation: "Inserting at head merely requires setting new_node.next = head and updating head pointer, an O(1) operation."
  },
  {
    subject: "Data Structures",
    difficulty: "Medium",
    question: "Which data structure is ideal for evaluating arithmetic expressions in Postfix (Reverse Polish) notation?",
    options: ["Stack", "Queue", "Array", "Graph"],
    correctAnswer: 0,
    explanation: "A Stack pushes operands and pops the top two when an operator is encountered, performing evaluation cleanly."
  },
  {
    subject: "Data Structures",
    difficulty: "Hard",
    question: "In a Red-Black Tree, what is the maximum possible height of a tree with n internal nodes?",
    options: ["log2(n)", "2 * log2(n + 1)", "n", "sqrt(n)"],
    correctAnswer: 1,
    explanation: "Red-Black tree properties ensure that the longest path from root to leaf is no more than twice the shortest path, bounding height to 2 * log2(n + 1)."
  },

  // ---------------------------------------------------------------------------
  // DAA (Design and Analysis of Algorithms)
  // ---------------------------------------------------------------------------
  {
    subject: "DAA",
    difficulty: "Easy",
    question: "What is the average and worst-case time complexity of Merge Sort?",
    options: [
      "Average: O(n log n), Worst: O(n log n)",
      "Average: O(n log n), Worst: O(n^2)",
      "Average: O(n), Worst: O(n log n)",
      "Average: O(n^2), Worst: O(n^2)"
    ],
    correctAnswer: 0,
    explanation: "Merge Sort consistently divides the array in half and performs linear merging, guaranteeing O(n log n) in all cases (best, average, and worst)."
  },
  {
    subject: "DAA",
    difficulty: "Easy",
    question: "Which algorithmic paradigm does Binary Search belong to?",
    options: ["Dynamic Programming", "Greedy Method", "Divide and Conquer", "Backtracking"],
    correctAnswer: 2,
    explanation: "Binary Search divides the search interval in half at each step, making it a classic Divide and Conquer strategy."
  },
  {
    subject: "DAA",
    difficulty: "Easy",
    question: "What does Big-O notation represent in algorithm analysis?",
    options: [
      "The exact running time in milliseconds",
      "An asymptotic upper bound on the growth rate of running time",
      "An asymptotic lower bound on the growth rate",
      "The tightest average-case bound"
    ],
    correctAnswer: 1,
    explanation: "Big-O defines an asymptotic upper bound, guaranteeing that execution time will not exceed f(n) multiplied by a constant factor for large n."
  },
  {
    subject: "DAA",
    difficulty: "Medium",
    question: "According to the Master Theorem, what is the solution to T(n) = 2T(n/2) + O(n)?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    correctAnswer: 1,
    explanation: "Here a = 2, b = 2, and f(n) = n. Since log_b(a) = log_2(2) = 1, and f(n) = Theta(n^1), Case 2 of Master Theorem applies: T(n) = Theta(n log n)."
  },
  {
    subject: "DAA",
    difficulty: "Medium",
    question: "Which algorithm solves the Single Source Shortest Path problem on graphs with non-negative edge weights?",
    options: ["Dijkstra's Algorithm", "Kruskal's Algorithm", "Prim's Algorithm", "Floyd-Warshall Algorithm"],
    correctAnswer: 0,
    explanation: "Dijkstra's algorithm uses a greedy priority-queue approach to find the shortest path from a single source in graphs without negative edge weights."
  },
  {
    subject: "DAA",
    difficulty: "Medium",
    question: "What is the optimal substructure property in Dynamic Programming?",
    options: [
      "The problem can be solved in constant time",
      "An optimal solution to the problem contains optimal solutions to its subproblems",
      "Subproblems do not share any state",
      "All edge weights must be integers"
    ],
    correctAnswer: 1,
    explanation: "Optimal substructure means an optimal solution to the overall problem is constructed from optimal solutions to its subproblems."
  },
  {
    subject: "DAA",
    difficulty: "Hard",
    question: "Which algorithm finds all-pairs shortest paths in a directed weighted graph in O(V^3) time?",
    options: ["Bellman-Ford", "Floyd-Warshall", "Dijkstra", "Johnson's Algorithm"],
    correctAnswer: 1,
    explanation: "Floyd-Warshall is a dynamic programming algorithm that computes shortest paths between all pairs of vertices in O(V^3) time."
  },
  {
    subject: "DAA",
    difficulty: "Hard",
    question: "What is the time complexity of the dynamic programming solution for the 0/1 Knapsack Problem with n items and capacity W?",
    options: ["O(n log n)", "O(n * W) (Pseudo-polynomial)", "O(2^n)", "O(W^2)"],
    correctAnswer: 1,
    explanation: "0/1 Knapsack DP fills an n x W table, running in O(n * W) time, which is pseudo-polynomial because W is represented in log(W) bits."
  },
  {
    subject: "DAA",
    difficulty: "Hard",
    question: "What is the class NP in computational complexity theory?",
    options: [
      "Problems solvable in polynomial time",
      "Non-computable problems",
      "Decision problems whose positive solutions can be verified in polynomial time by a deterministic Turing machine",
      "Problems requiring exponential memory space"
    ],
    correctAnswer: 2,
    explanation: "NP (Nondeterministic Polynomial time) is the set of decision problems for which a proposed solution certificate can be verified in polynomial time."
  },
  {
    subject: "DAA",
    difficulty: "Easy",
    question: "Which algorithm is used to find the Minimum Spanning Tree of a connected, undirected graph using a greedy edge-selection approach?",
    options: ["Kruskal's Algorithm", "Binary Search", "Rabin-Karp", "Depth First Search"],
    correctAnswer: 0,
    explanation: "Kruskal's algorithm sorts all edges by weight and greedily adds the smallest edge that does not form a cycle (using Disjoint Set Union)."
  },
  {
    subject: "DAA",
    difficulty: "Medium",
    question: "What is the worst-case time complexity of QuickSort?",
    options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
    correctAnswer: 1,
    explanation: "When unbalanced pivots are chosen (e.g. sorted input with last element as pivot), QuickSort recursion depth becomes n, taking O(n^2) time."
  },
  {
    subject: "DAA",
    difficulty: "Hard",
    question: "Which algorithm can detect negative weight cycles while finding single source shortest paths?",
    options: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Prim's Algorithm", "Tarjan's Algorithm"],
    correctAnswer: 1,
    explanation: "Bellman-Ford relaxes all edges V-1 times. A subsequent V-th relaxation cycle will detect any reachable negative-weight cycle."
  }
];

// =============================================================================
// 2. THEME MANAGEMENT (Persistent Dark / Light Mode)
// =============================================================================

function initTheme() {
  const savedTheme = localStorage.getItem('quizmaster_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('quizmaster_theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    if (theme === 'dark') {
      // Sun icon for switching back to light
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <circle cx="12" cy="12" r="4"></circle>
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      `;
      btn.setAttribute('aria-label', 'Switch to light mode');
      btn.setAttribute('title', 'Switch to light mode');
    } else {
      // Moon icon for switching to dark
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      `;
      btn.setAttribute('aria-label', 'Switch to dark mode');
      btn.setAttribute('title', 'Switch to dark mode');
    }
  });
}

// =============================================================================
// 3. NAVIGATION & MOBILE MENU
// =============================================================================

function initNavigation() {
  // Mobile hamburger toggle
  const hamburger = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const expanded = navMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', expanded);
    });
  }

  // Bind theme toggle buttons
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Mark current page active in navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// =============================================================================
// 4. RANDOMIZATION & QUIZ SELECTION LOGIC
// =============================================================================

/**
 * Fisher-Yates array shuffle algorithm
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Shuffles options for a question while maintaining correct answer index
 */
function randomizeQuestionOptions(question) {
  const originalCorrectAnswerText = question.options[question.correctAnswer];
  const shuffledOptions = shuffleArray(question.options);
  const newCorrectAnswerIndex = shuffledOptions.indexOf(originalCorrectAnswerText);
  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectAnswerIndex
  };
}

/**
 * Prepares randomized questions based on chosen subject, difficulty, and count
 */
function prepareQuizQuestions(subject, difficulty, count) {
  // Filter questions for the chosen subject
  const subjectQuestions = questionsDB.filter(q => q.subject.toLowerCase() === subject.toLowerCase());
  
  if (subjectQuestions.length === 0) {
    console.error(`No questions found for subject: ${subject}`);
    return [];
  }

  // Filter by requested difficulty
  const difficultyQuestions = subjectQuestions.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  
  // If we have enough in the requested difficulty, use them
  let pool = [];
  if (difficultyQuestions.length >= count) {
    pool = shuffleArray(difficultyQuestions).slice(0, count);
  } else {
    // Combine difficulty questions with remaining subject questions to guarantee count
    const remainingSubjectQuestions = subjectQuestions.filter(q => q.difficulty.toLowerCase() !== difficulty.toLowerCase());
    const combined = [...shuffleArray(difficultyQuestions), ...shuffleArray(remainingSubjectQuestions)];
    pool = combined.slice(0, count);
  }

  // Randomize the order of questions
  const shuffledPool = shuffleArray(pool);

  // Randomize options for each question
  return shuffledPool.map(q => randomizeQuestionOptions(q));
}

// =============================================================================
// 5. QUIZ SETUP & MODAL LOGIC (index.html)
// =============================================================================

function initQuizSetupModal() {
  const modal = document.getElementById('quizSetupModal');
  if (!modal) return;

  const closeBtn = document.getElementById('closeModalBtn');
  const startBtns = document.querySelectorAll('.trigger-quiz-setup');
  const form = document.getElementById('quizSetupForm');
  const studentNameInput = document.getElementById('studentNameInput');
  const nameError = document.getElementById('nameError');
  const subjectSelect = document.getElementById('subjectSelect');

  // Segmented Difficulty Controls
  const diffBtns = document.querySelectorAll('.diff-btn');
  let selectedDifficulty = 'Medium';
  diffBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      diffBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedDifficulty = btn.getAttribute('data-value');
    });
  });

  // Segmented Question Count Controls
  const countBtns = document.querySelectorAll('.count-btn');
  let selectedCount = 10;
  countBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      countBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCount = parseInt(btn.getAttribute('data-value'), 10);
    });
  });

  // Open modal handlers
  startBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preSubject = btn.getAttribute('data-subject');
      if (preSubject && subjectSelect) {
        subjectSelect.value = preSubject;
      }
      // Populate cached name if available
      const cachedName = localStorage.getItem('quizmaster_user_name');
      if (cachedName && studentNameInput) {
        studentNameInput.value = cachedName;
      }
      modal.classList.add('active');
      if (studentNameInput) studentNameInput.focus();
    });
  });

  // Close modal handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Form Submit & Validation
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const studentName = studentNameInput.value.trim();
      const subject = subjectSelect.value;

      // Validation
      if (!studentName) {
        nameError.textContent = "Please enter your name to proceed.";
        nameError.classList.add('visible');
        studentNameInput.focus();
        return;
      } else {
        nameError.classList.remove('visible');
      }

      if (!subject) {
        alert("Please select a subject.");
        return;
      }

      // Time limit in seconds: 5 questions -> 5 mins (300s), 10 -> 10 mins (600s), 15 -> 15 mins (900s)
      const timeLimitSeconds = selectedCount * 60;

      // Prepare quiz questions
      const selectedQuestions = prepareQuizQuestions(subject, selectedDifficulty, selectedCount);

      if (selectedQuestions.length === 0) {
        alert("Could not load questions for this subject. Please try another subject.");
        return;
      }

      // Save user name for convenience
      localStorage.setItem('quizmaster_user_name', studentName);

      // Create Active Quiz State Object
      const activeQuizState = {
        studentName: studentName,
        subject: subject,
        difficulty: selectedDifficulty,
        totalQuestions: selectedQuestions.length,
        timeLimitSeconds: timeLimitSeconds,
        timeRemainingSeconds: timeLimitSeconds,
        questions: selectedQuestions,
        userAnswers: {}, // { [questionIndex]: selectedOptionIndex }
        currentQuestionIndex: 0,
        startedAt: Date.now()
      };

      // Store in localStorage
      localStorage.setItem('quizmaster_active_quiz', JSON.stringify(activeQuizState));

      // Redirect to quiz page
      window.location.href = 'quiz.html';
    });
  }
}

// =============================================================================
// 6. QUIZ PAGE CONTROLLER (quiz.html)
// =============================================================================

let timerInterval = null;
let activeQuiz = null;

function initQuizPage() {
  const quizContainer = document.getElementById('quizPageRoot');
  if (!quizContainer) return;

  // Retrieve active quiz state from localStorage
  const savedState = localStorage.getItem('quizmaster_active_quiz');
  if (!savedState) {
    alert("No active quiz found! Redirecting to home page to set up a quiz.");
    window.location.href = 'index.html';
    return;
  }

  try {
    activeQuiz = JSON.parse(savedState);
  } catch (err) {
    console.error("Failed to parse quiz state", err);
    window.location.href = 'index.html';
    return;
  }

  // Populate Header Meta Details
  document.getElementById('displayStudentName').textContent = activeQuiz.studentName;
  document.getElementById('displaySubject').textContent = activeQuiz.subject;
  document.getElementById('displayDifficulty').textContent = activeQuiz.difficulty;

  // Start the Countdown Timer
  startQuizTimer();

  // Render the initial question
  renderQuestion(activeQuiz.currentQuestionIndex);

  // Setup navigation controls
  setupQuizNavigationControls();
}

/**
 * Starts the countdown timer and handles auto-submission
 */
function startQuizTimer() {
  const timerDisplay = document.getElementById('timerDisplay');
  const timerBox = document.getElementById('quizTimerBox');

  function updateDisplay() {
    const mins = Math.floor(activeQuiz.timeRemainingSeconds / 60);
    const secs = activeQuiz.timeRemainingSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (timerDisplay) {
      timerDisplay.textContent = formatted;
    }

    // Visual Alert States
    if (timerBox) {
      if (activeQuiz.timeRemainingSeconds <= 30) {
        timerBox.className = 'quiz-timer-box danger';
      } else if (activeQuiz.timeRemainingSeconds <= 60) {
        timerBox.className = 'quiz-timer-box warning';
      } else {
        timerBox.className = 'quiz-timer-box';
      }
    }
  }

  updateDisplay();

  timerInterval = setInterval(() => {
    activeQuiz.timeRemainingSeconds--;

    // Periodically save state to localStorage
    if (activeQuiz.timeRemainingSeconds % 5 === 0) {
      localStorage.setItem('quizmaster_active_quiz', JSON.stringify(activeQuiz));
    }

    updateDisplay();

    if (activeQuiz.timeRemainingSeconds <= 0) {
      clearInterval(timerInterval);
      alert("Time's up! Your quiz is being automatically submitted.");
      submitQuizFinal();
    }
  }, 1000);
}

/**
 * Renders the question at index
 */
function renderQuestion(index) {
  if (!activeQuiz || !activeQuiz.questions || !activeQuiz.questions[index]) return;

  activeQuiz.currentQuestionIndex = index;
  const q = activeQuiz.questions[index];
  const total = activeQuiz.totalQuestions;

  // Progress Bar
  const progressBar = document.getElementById('quizProgressBar');
  if (progressBar) {
    const percent = Math.round(((index + 1) / total) * 100);
    progressBar.style.width = `${percent}%`;
  }

  // Question header labels
  const qNumBadge = document.getElementById('questionNumberBadge');
  if (qNumBadge) {
    qNumBadge.textContent = `Question ${index + 1} of ${total}`;
  }

  const qDiffTag = document.getElementById('questionDifficultyTag');
  if (qDiffTag) {
    qDiffTag.textContent = q.difficulty;
    qDiffTag.className = `question-difficulty-tag tag-${q.difficulty.toLowerCase()}`;
  }

  // Question text
  const qText = document.getElementById('questionText');
  if (qText) {
    qText.textContent = q.question;
  }

  // Options
  const optionsList = document.getElementById('optionsList');
  if (optionsList) {
    optionsList.innerHTML = '';
    const optionLetters = ['A', 'B', 'C', 'D'];
    const currentSelectedOption = activeQuiz.userAnswers[index];

    q.options.forEach((optText, optIndex) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `option-btn ${currentSelectedOption === optIndex ? 'selected' : ''}`;
      btn.innerHTML = `
        <span class="option-key">${optionLetters[optIndex]}</span>
        <span class="option-label">${escapeHTML(optText)}</span>
      `;
      btn.addEventListener('click', () => {
        selectOption(index, optIndex);
      });
      optionsList.appendChild(btn);
    });
  }

  // Navigation button states
  const prevBtn = document.getElementById('prevQuestionBtn');
  const nextBtn = document.getElementById('nextQuestionBtn');

  if (prevBtn) {
    prevBtn.disabled = index === 0;
  }

  if (nextBtn) {
    if (index === total - 1) {
      nextBtn.textContent = 'Submit Quiz';
      nextBtn.className = 'btn btn-primary';
    } else {
      nextBtn.textContent = 'Next Question →';
      nextBtn.className = 'btn btn-primary';
    }
  }

  // Render Quick Jump Question Palette
  renderQuestionPalette();

  // Save current progress
  localStorage.setItem('quizmaster_active_quiz', JSON.stringify(activeQuiz));
}

/**
 * Handles selecting/changing an answer
 */
function selectOption(questionIndex, optionIndex) {
  activeQuiz.userAnswers[questionIndex] = optionIndex;
  localStorage.setItem('quizmaster_active_quiz', JSON.stringify(activeQuiz));

  // Update UI selection on buttons
  const options = document.querySelectorAll('.option-btn');
  options.forEach((btn, idx) => {
    if (idx === optionIndex) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });

  // Update palette
  renderQuestionPalette();
}

/**
 * Renders the question number palette for quick navigation
 */
function renderQuestionPalette() {
  const paletteGrid = document.getElementById('paletteGrid');
  if (!paletteGrid || !activeQuiz) return;

  paletteGrid.innerHTML = '';
  activeQuiz.questions.forEach((_, idx) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'palette-item';
    item.textContent = idx + 1;

    const isAnswered = activeQuiz.userAnswers[idx] !== undefined;
    const isCurrent = activeQuiz.currentQuestionIndex === idx;

    if (isCurrent) item.classList.add('current');
    if (isAnswered) item.classList.add('answered');

    item.addEventListener('click', () => {
      renderQuestion(idx);
    });

    paletteGrid.appendChild(item);
  });
}

/**
 * Connects Previous, Next, and Submit controls
 */
function setupQuizNavigationControls() {
  const prevBtn = document.getElementById('prevQuestionBtn');
  const nextBtn = document.getElementById('nextQuestionBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (activeQuiz.currentQuestionIndex > 0) {
        renderQuestion(activeQuiz.currentQuestionIndex - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const isLast = activeQuiz.currentQuestionIndex === activeQuiz.totalQuestions - 1;
      if (isLast) {
        confirmAndSubmitQuiz();
      } else {
        renderQuestion(activeQuiz.currentQuestionIndex + 1);
      }
    });
  }
}

/**
 * Checks for unanswered questions and prompts user before final submission
 */
function confirmAndSubmitQuiz() {
  const answeredCount = Object.keys(activeQuiz.userAnswers).length;
  const unansweredCount = activeQuiz.totalQuestions - answeredCount;

  if (unansweredCount > 0) {
    const confirmed = confirm(
      `You have ${unansweredCount} unanswered question(s).\nAre you sure you want to submit your quiz now?`
    );
    if (!confirmed) return;
  }
  submitQuizFinal();
}

/**
 * Computes score, saves results & leaderboard, clears active quiz, and redirects
 */
function submitQuizFinal() {
  if (timerInterval) clearInterval(timerInterval);

  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  activeQuiz.questions.forEach((q, index) => {
    const userChoice = activeQuiz.userAnswers[index];
    if (userChoice === undefined) {
      unansweredCount++;
    } else if (userChoice === q.correctAnswer) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const total = activeQuiz.totalQuestions;
  const percentage = Math.round((correctCount / total) * 100);
  const timeTakenSeconds = Math.max(0, activeQuiz.timeLimitSeconds - activeQuiz.timeRemainingSeconds);

  // Build the complete result object
  const resultData = {
    id: 'quiz_' + Date.now(),
    studentName: activeQuiz.studentName,
    subject: activeQuiz.subject,
    difficulty: activeQuiz.difficulty,
    totalQuestions: total,
    correctCount: correctCount,
    incorrectCount: incorrectCount,
    unansweredCount: unansweredCount,
    score: correctCount,
    percentage: percentage,
    timeTakenSeconds: timeTakenSeconds,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    timestamp: Date.now(),
    questions: activeQuiz.questions,
    userAnswers: activeQuiz.userAnswers
  };

  // 1. Save last result in localStorage for result.html
  localStorage.setItem('quizmaster_last_result', JSON.stringify(resultData));

  // 2. Save into Leaderboard list
  saveToLeaderboard(resultData);

  // 3. Remove active quiz state
  localStorage.removeItem('quizmaster_active_quiz');

  // 4. Redirect to result page
  window.location.href = 'result.html';
}

// =============================================================================
// 7. LEADERBOARD LOCALSTORAGE HANDLER
// =============================================================================

function getLeaderboard() {
  const raw = localStorage.getItem('quizmaster_leaderboard');
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Leaderboard parsing error", err);
    return [];
  }
}

function saveToLeaderboard(entry) {
  const current = getLeaderboard();
  current.push({
    id: entry.id,
    studentName: entry.studentName,
    subject: entry.subject,
    difficulty: entry.difficulty,
    score: entry.score,
    totalQuestions: entry.totalQuestions,
    percentage: entry.percentage,
    timeTakenSeconds: entry.timeTakenSeconds,
    date: entry.date,
    timestamp: entry.timestamp
  });

  // Sort descending by percentage, then score, then fastest time
  current.sort((a, b) => {
    if (b.percentage !== a.percentage) return b.percentage - a.percentage;
    if (b.score !== a.score) return b.score - a.score;
    return a.timeTakenSeconds - b.timeTakenSeconds;
  });

  // Keep top 100 entries
  const trimmed = current.slice(0, 100);
  localStorage.setItem('quizmaster_leaderboard', JSON.stringify(trimmed));
}

// =============================================================================
// 8. RESULT PAGE CONTROLLER (result.html)
// =============================================================================

function initResultPage() {
  const resultContainer = document.getElementById('resultPageRoot');
  if (!resultContainer) return;

  const rawResult = localStorage.getItem('quizmaster_last_result');
  if (!rawResult) {
    alert("No recent quiz result found. Please take a quiz first.");
    window.location.href = 'index.html';
    return;
  }

  let res;
  try {
    res = JSON.parse(rawResult);
  } catch (err) {
    console.error("Result parse error", err);
    window.location.href = 'index.html';
    return;
  }

  // Populate Meta Info
  document.getElementById('resStudentName').textContent = res.studentName;
  document.getElementById('resSubject').textContent = res.subject;
  document.getElementById('resDifficulty').textContent = res.difficulty;

  // Fraction Score
  document.getElementById('resScoreFraction').textContent = `${res.score} / ${res.totalQuestions}`;
  document.getElementById('resScorePercent').textContent = `${res.percentage}%`;

  // Summary Metrics
  document.getElementById('statCorrect').textContent = res.correctCount;
  document.getElementById('statIncorrect').textContent = res.incorrectCount;
  document.getElementById('statUnanswered').textContent = res.unansweredCount;
  document.getElementById('statPercentage').textContent = `${res.percentage}%`;

  // Format Time Taken
  const mins = Math.floor(res.timeTakenSeconds / 60);
  const secs = res.timeTakenSeconds % 60;
  document.getElementById('statTimeTaken').textContent = `${mins}m ${secs}s`;

  // Performance Message (Non-exaggerated, realistic)
  const perfMsgEl = document.getElementById('performanceMessage');
  if (perfMsgEl) {
    if (res.percentage >= 80) {
      perfMsgEl.textContent = 'Excellent Performance!';
      perfMsgEl.className = 'performance-message performance-excellent';
    } else if (res.percentage >= 50) {
      perfMsgEl.textContent = 'Good Job!';
      perfMsgEl.className = 'performance-message performance-good';
    } else {
      perfMsgEl.textContent = 'Keep Practicing!';
      perfMsgEl.className = 'performance-message performance-poor';
    }
  }

  // Animate Circular Progress Indicator
  const circle = document.getElementById('scoreProgressCircle');
  if (circle) {
    // Circle circumference with r=70 is 2 * PI * 70 approx 440
    const circumference = 440;
    const offset = circumference - (res.percentage / 100) * circumference;
    setTimeout(() => {
      circle.style.strokeDashoffset = offset;
    }, 150);
  }

  // Render Answer Review Section
  renderAnswerReview(res);

  // Action Buttons
  const tryAgainBtn = document.getElementById('tryAgainBtn');
  if (tryAgainBtn) {
    tryAgainBtn.addEventListener('click', () => {
      // Re-launch quiz with same parameters
      const selectedQuestions = prepareQuizQuestions(res.subject, res.difficulty, res.totalQuestions);
      const timeLimitSeconds = res.totalQuestions * 60;
      const newQuiz = {
        studentName: res.studentName,
        subject: res.subject,
        difficulty: res.difficulty,
        totalQuestions: selectedQuestions.length,
        timeLimitSeconds: timeLimitSeconds,
        timeRemainingSeconds: timeLimitSeconds,
        questions: selectedQuestions,
        userAnswers: {},
        currentQuestionIndex: 0,
        startedAt: Date.now()
      };
      localStorage.setItem('quizmaster_active_quiz', JSON.stringify(newQuiz));
      window.location.href = 'quiz.html';
    });
  }

  const chooseAnotherBtn = document.getElementById('chooseAnotherBtn');
  if (chooseAnotherBtn) {
    chooseAnotherBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  const viewLeaderboardBtn = document.getElementById('viewLeaderboardBtn');
  if (viewLeaderboardBtn) {
    viewLeaderboardBtn.addEventListener('click', () => {
      window.location.href = 'leaderboard.html';
    });
  }
}

/**
 * Generates the detailed Answer Review list
 */
function renderAnswerReview(result) {
  const reviewList = document.getElementById('answerReviewList');
  if (!reviewList) return;

  reviewList.innerHTML = '';
  const optionLetters = ['A', 'B', 'C', 'D'];

  result.questions.forEach((q, index) => {
    const userAnsIndex = result.userAnswers[index];
    const isUnanswered = userAnsIndex === undefined;
    const isCorrect = !isUnanswered && userAnsIndex === q.correctAnswer;

    const card = document.createElement('article');
    card.className = `review-item-card ${isCorrect ? 'is-correct' : isUnanswered ? 'is-unanswered' : 'is-incorrect'}`;

    let badgeMarkup = '';
    if (isCorrect) {
      badgeMarkup = `<span class="review-badge badge-correct">✓ Correct</span>`;
    } else if (isUnanswered) {
      badgeMarkup = `<span class="review-badge badge-unanswered">⚠ Not Answered</span>`;
    } else {
      badgeMarkup = `<span class="review-badge badge-incorrect">✕ Incorrect</span>`;
    }

    const userAnsText = isUnanswered 
      ? 'Not Answered' 
      : `${optionLetters[userAnsIndex]}. ${escapeHTML(q.options[userAnsIndex])}`;

    const correctAnsText = `${optionLetters[q.correctAnswer]}. ${escapeHTML(q.options[q.correctAnswer])}`;

    card.innerHTML = `
      <div class="review-item-top">
        <span class="review-q-number">Question ${index + 1} of ${result.totalQuestions}</span>
        ${badgeMarkup}
      </div>
      <h3 class="review-q-text">${escapeHTML(q.question)}</h3>
      <div class="review-answers-box">
        <div class="answer-row">
          <span class="answer-label">Your Answer:</span>
          <span class="answer-text ${isCorrect ? 'user-ans-correct' : isUnanswered ? 'user-ans-none' : 'user-ans-incorrect'}">
            ${userAnsText}
          </span>
        </div>
        <div class="answer-row">
          <span class="answer-label">Correct Answer:</span>
          <span class="answer-text correct-ans">
            ${correctAnsText}
          </span>
        </div>
      </div>
      <div class="review-explanation">
        <span class="explanation-kicker">Explanation:</span> ${escapeHTML(q.explanation || 'No explanation provided.')}
      </div>
    `;

    reviewList.appendChild(card);
  });
}

// =============================================================================
// 9. LEADERBOARD PAGE CONTROLLER (leaderboard.html)
// =============================================================================

function initLeaderboardPage() {
  const tableBody = document.getElementById('leaderboardTableBody');
  if (!tableBody) return;

  const subjectFilter = document.getElementById('leaderboardSubjectFilter');
  const clearBtn = document.getElementById('clearLeaderboardBtn');

  function renderLeaderboardTable() {
    const list = getLeaderboard();
    const filter = subjectFilter ? subjectFilter.value : 'all';

    const filtered = filter === 'all' 
      ? list 
      : list.filter(item => item.subject.toLowerCase() === filter.toLowerCase());

    // Update Podium Cards (Top 3 overall or filtered)
    renderPodium(filtered.slice(0, 3));

    tableBody.innerHTML = '';

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="empty-leaderboard">
              <div class="empty-icon">🏆</div>
              <h3>No quiz records found</h3>
              <p>Be the first to complete a quiz and earn your spot on the leaderboard!</p>
              <br>
              <a href="index.html" class="btn btn-primary btn-sm">Start a Quiz</a>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach((entry, index) => {
      const tr = document.createElement('tr');
      const rank = index + 1;
      let rankClass = '';
      let rankBadgeContent = rank;

      if (rank === 1) {
        rankClass = 'rank-1-badge';
        rankBadgeContent = '🥇';
      } else if (rank === 2) {
        rankClass = 'rank-2-badge';
        rankBadgeContent = '🥈';
      } else if (rank === 3) {
        rankClass = 'rank-3-badge';
        rankBadgeContent = '🥉';
      }

      tr.innerHTML = `
        <td>
          <span class="rank-badge ${rankClass}">${rankBadgeContent}</span>
        </td>
        <td class="table-student-name">${escapeHTML(entry.studentName)}</td>
        <td>${escapeHTML(entry.subject)}</td>
        <td><span class="table-score-highlight">${entry.score} / ${entry.totalQuestions}</span></td>
        <td><strong>${entry.percentage}%</strong></td>
        <td>${formatSeconds(entry.timeTakenSeconds)}</td>
        <td>${entry.date || 'Recent'}</td>
      `;

      tableBody.appendChild(tr);
    });
  }

  function renderPodium(topThree) {
    const podiumContainer = document.getElementById('podiumContainer');
    if (!podiumContainer) return;

    if (topThree.length === 0) {
      podiumContainer.style.display = 'none';
      return;
    }

    podiumContainer.style.display = 'grid';
    podiumContainer.innerHTML = '';

    const medals = ['🥇 1st Place', '🥈 2nd Place', '🥉 3rd Place'];
    const rankClasses = ['rank-1', 'rank-2', 'rank-3'];

    topThree.forEach((entry, i) => {
      const card = document.createElement('div');
      card.className = `podium-card ${rankClasses[i]}`;
      card.innerHTML = `
        <div class="podium-medal">${medals[i]}</div>
        <div class="podium-name">${escapeHTML(entry.studentName)}</div>
        <div class="podium-subject">${escapeHTML(entry.subject)} (${entry.difficulty})</div>
        <div class="podium-score">${entry.score}/${entry.totalQuestions} (${entry.percentage}%)</div>
      `;
      podiumContainer.appendChild(card);
    });
  }

  if (subjectFilter) {
    subjectFilter.addEventListener('change', renderLeaderboardTable);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const confirmed = confirm("Are you sure you want to clear the entire leaderboard history?\nThis action cannot be undone.");
      if (confirmed) {
        localStorage.removeItem('quizmaster_leaderboard');
        renderLeaderboardTable();
      }
    });
  }

  renderLeaderboardTable();
}

// =============================================================================
// 10. UTILITY HELPERS
// =============================================================================

function escapeHTML(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatSeconds(seconds) {
  if (isNaN(seconds) || seconds === undefined) return '--';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

// =============================================================================
// 11. GLOBAL INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Always initialize theme and navigation
  initTheme();
  initNavigation();

  // Page-specific initializers based on element existence
  initQuizSetupModal();
  initQuizPage();
  initResultPage();
  initLeaderboardPage();
});
