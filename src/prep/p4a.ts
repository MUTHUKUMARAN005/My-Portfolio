import type { Block } from "./types";

export const P4_CORE: Block[] = [
  { kind: "heading", title: "A · Core: Java, OOP, DSA, SQL, Spring", sub: "Essential first — these decide most campus and trainee interviews." },
  {
    kind: "qa",
    title: "Java fundamentals & Java 17",
    items: [
      {
        q: "JDK vs JRE vs JVM?",
        a: "The JVM executes bytecode. The JRE is the JVM plus core libraries needed to run programs. The JDK is the JRE plus developer tools like javac, jar and the debugger. You need the JDK to develop and the JRE/JVM to run.",
      },
      {
        q: "== vs equals(), and what is the hashCode contract?",
        a: "== compares references for objects (values for primitives). equals() compares logical equality when overridden. If two objects are equal by equals(), they must return the same hashCode(); otherwise HashMap/HashSet break because lookups use the hash first.",
        follow: ["Why is String == tricky?", "What happens if you override equals but not hashCode?"],
      },
      {
        q: "Which Java 17 features should I know?",
        a: "Java 17 is an LTS release. Know: records (compact immutable data carriers), sealed classes/interfaces (restrict who can extend), text blocks (multi-line strings), switch expressions, pattern matching for instanceof, helpful NullPointerException messages, and var (since 10). Pattern matching for switch is still preview in 17.",
        follow: ["Write a record.", "Why use sealed types?"],
      },
      {
        q: "Why is String immutable?",
        a: "Immutability enables the string pool (safe sharing), makes Strings thread-safe, lets hashCode be cached (fast HashMap keys) and improves security for things like class names and connection URLs. The trade-off is that repeated concatenation creates objects, so use StringBuilder in loops.",
      },
      {
        q: "Is Java pass-by-value or pass-by-reference?",
        a: "Always pass-by-value. For objects, the value copied is the reference, so a method can mutate the object but cannot make the caller's variable point somewhere else.",
        level: "advanced",
      },
    ],
  },
  {
    kind: "qa",
    title: "OOP principles & scenarios",
    items: [
      {
        q: "Explain the four OOP pillars with an example.",
        a: "Encapsulation: private fields with controlled access (Account.balance). Abstraction: expose what, hide how (interface PaymentMethod). Inheritance: reuse via extends (SavingsAccount extends Account). Polymorphism: one interface, many behaviours (pay() differs for Card and UPI).",
      },
      {
        q: "Abstract class vs interface?",
        a: "An abstract class can hold state and constructors and supports single inheritance; use it for a shared base with common behaviour. An interface defines a contract, supports multiple implementation, and since Java 8 can have default and static methods; use it for capabilities. Prefer interfaces for flexibility.",
      },
      {
        q: "Overloading vs overriding?",
        a: "Overloading: same name, different parameters, resolved at compile time. Overriding: subclass redefines a parent method with the same signature, resolved at runtime (dynamic dispatch).",
      },
      {
        q: "Scenario: an app supports Card, UPI and NetBanking payments. How do you design it?",
        a: "Define interface PaymentMethod { PaymentResult pay(Money amount); } with one class per method. A PaymentService picks the implementation (Strategy pattern, or Spring-injected map of beans). Adding a new method means adding a class, not editing existing logic (Open/Closed Principle).",
        level: "advanced",
      },
      {
        q: "Composition vs inheritance?",
        a: "Inheritance models ‘is-a’ and couples subclass to parent; composition models ‘has-a’ and is more flexible and testable. Favour composition unless there is a true is-a relationship.",
      },
    ],
  },
  {
    kind: "qa",
    title: "Collections, exceptions, strings, multithreading, JVM",
    items: [
      {
        q: "How does HashMap work internally?",
        a: "The key's hashCode is spread and mapped to a bucket index. Collisions are stored as a linked list, and from Java 8 a bucket converts to a balanced tree once it has 8+ nodes (and the table is large enough). Default load factor is 0.75; when exceeded the table doubles and entries are rehashed. Average get/put is O(1).",
        follow: ["Why is a good hashCode important?", "Can null be a key?"],
      },
      {
        q: "ArrayList vs LinkedList?",
        a: "ArrayList: dynamic array, O(1) random access, amortised O(1) append, O(n) inserts in the middle. LinkedList: O(1) insert/delete at a known node but O(n) access, plus higher memory overhead. In practice ArrayList wins most of the time.",
      },
      {
        q: "HashMap vs Hashtable vs ConcurrentHashMap?",
        a: "HashMap is unsynchronised and fast. Hashtable is legacy and synchronises every method. ConcurrentHashMap provides thread safety with fine-grained locking/CAS and much better concurrency; use it for shared maps.",
      },
      {
        q: "Checked vs unchecked exceptions? What is try-with-resources?",
        a: "Checked exceptions (IOException) must be handled or declared; unchecked (RuntimeException subclasses) represent programming errors. try-with-resources automatically closes any AutoCloseable, even on exceptions, avoiding leaks.",
      },
      {
        q: "String vs StringBuilder vs StringBuffer?",
        a: "String is immutable; StringBuilder is mutable and not thread-safe (fast); StringBuffer is mutable and synchronised. Use StringBuilder for concatenation in loops.",
      },
      {
        q: "How do you create threads, and Runnable vs Callable?",
        a: "Implement Runnable (or extend Thread), but in real code use ExecutorService. Runnable returns nothing and cannot throw checked exceptions; Callable returns a value (via Future) and can throw.",
      },
      {
        q: "synchronized vs ReentrantLock vs volatile?",
        a: "synchronized gives mutual exclusion and visibility with simple syntax. ReentrantLock adds tryLock, timeouts and fairness. volatile guarantees visibility and ordering of a single variable but not atomicity (count++ is still unsafe — use AtomicInteger).",
        follow: ["What is a deadlock and how do you prevent it?"],
        level: "advanced",
      },
      {
        q: "JVM memory areas and garbage collection?",
        a: "Heap (objects; young and old generations), stack (per-thread frames), metaspace (class metadata), plus PC registers and native stacks. The GC reclaims unreachable objects; G1 is the default collector since Java 9. Memory leaks in Java usually mean lingering references, e.g. static collections.",
        level: "advanced",
      },
    ],
  },
  {
    kind: "qa",
    title: "DSA concepts interviewers ask verbally",
    items: [
      {
        q: "Time complexity of common operations?",
        a: "Array access O(1), search O(n); sorted array binary search O(log n); HashMap get/put average O(1); balanced BST O(log n); heap insert/remove O(log n); BFS/DFS O(V+E); merge sort O(n log n); quicksort average O(n log n), worst O(n²).",
      },
      {
        q: "BFS vs DFS — when to use which?",
        a: "BFS (queue) explores level by level — shortest path in unweighted graphs, level-order traversal. DFS (stack/recursion) goes deep — cycle detection, connected components, backtracking, topological sort.",
      },
      {
        q: "Recursion vs dynamic programming?",
        a: "Plain recursion may recompute the same subproblems exponentially. DP stores results (memoisation top-down or tabulation bottom-up) so each subproblem is solved once. Use it when you see overlapping subproblems and optimal substructure.",
      },
      {
        q: "Quick sort vs merge sort?",
        a: "Merge sort is stable with guaranteed O(n log n) but needs O(n) extra space. Quick sort is in-place and usually faster in practice but O(n²) worst case without good pivots. Java uses dual-pivot quicksort for primitives and TimSort (stable) for objects.",
        level: "advanced",
      },
    ],
  },
  {
    kind: "qa",
    title: "SQL, DBMS, joins, indexes, transactions, normalization",
    items: [
      {
        q: "Explain the types of joins.",
        a: "INNER returns matching rows from both tables. LEFT returns all left rows plus matches (NULLs when none). RIGHT is the mirror. FULL returns all rows from both. CROSS returns the Cartesian product. A self join joins a table to itself (employee → manager).",
      },
      {
        q: "WHERE vs HAVING?",
        a: "WHERE filters rows before grouping; HAVING filters groups after aggregation (e.g. HAVING COUNT(*) > 1).",
      },
      {
        q: "What is an index and when does it hurt?",
        a: "An index (usually a B-tree) lets the database find rows without scanning the whole table, trading extra storage and slower writes for faster reads. It helps on selective columns used in WHERE, JOIN and ORDER BY; it may not be used with functions on the column (WHERE LOWER(email)=…) or leading wildcards (LIKE '%abc').",
        follow: ["Composite index column order?", "Clustered vs non-clustered?"],
      },
      {
        q: "Explain ACID and isolation levels.",
        a: "Atomicity: all or nothing. Consistency: constraints always hold. Isolation: concurrent transactions don't see each other's partial work. Durability: committed data survives crashes. Isolation levels — READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE — trade consistency against concurrency by allowing or preventing dirty, non-repeatable and phantom reads.",
        level: "advanced",
      },
      {
        q: "Explain normalization (1NF–3NF).",
        a: "1NF: atomic values, no repeating groups. 2NF: 1NF and no partial dependency on part of a composite key. 3NF: 2NF and no transitive dependency (non-key columns depend only on the key). It reduces redundancy and update anomalies; sometimes you denormalise deliberately for read performance.",
      },
      {
        q: "DELETE vs TRUNCATE vs DROP? Primary vs unique vs foreign key?",
        a: "DELETE removes selected rows (logged, can use WHERE and rollback). TRUNCATE quickly removes all rows and resets the table. DROP removes the table itself. Primary key: unique and not null, one per table. Unique: unique values, may allow one NULL depending on DB. Foreign key: references another table's key to enforce integrity.",
      },
    ],
  },
  {
    kind: "qa",
    title: "Spring Boot, DI, JPA/Hibernate, REST, Spring Security",
    items: [
      {
        q: "What is Spring Boot auto-configuration?",
        a: "Spring Boot inspects the classpath and your properties and automatically configures beans — for example, if spring-boot-starter-web and a DataSource driver are present, it configures an embedded server and a connection pool. You override only what you need. @SpringBootApplication combines @Configuration, @EnableAutoConfiguration and @ComponentScan.",
      },
      {
        q: "Explain dependency injection and IoC.",
        a: "Instead of a class creating its dependencies, the Spring container creates and injects them. Constructor injection is preferred: dependencies are explicit, final and easy to mock in tests. IoC means the framework controls object creation and lifecycle.",
        follow: ["Constructor vs field injection?", "Bean scopes?"],
      },
      {
        q: "@Controller vs @RestController, and Service vs Repository?",
        a: "@RestController = @Controller + @ResponseBody, returning data (JSON) directly. @Service holds business logic; @Repository handles data access and translates persistence exceptions. Layering keeps concerns separated: controller → service → repository.",
      },
      {
        q: "JPA/Hibernate: LAZY vs EAGER, the N+1 problem, @Transactional?",
        a: "LAZY loads associations on demand; EAGER loads them immediately. N+1 occurs when loading N parents triggers N extra queries for children; fix with fetch join, @EntityGraph or DTO projections. @Transactional wraps a method in a transaction (commit on success, rollback on runtime exceptions) via a proxy — so self-invocation bypasses it.",
        level: "advanced",
      },
      {
        q: "REST principles and status codes?",
        a: "Resources identified by URLs; use HTTP verbs properly (GET safe, PUT/DELETE idempotent, POST creates); stateless requests; consistent JSON. Codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized (unauthenticated), 403 Forbidden, 404 Not Found, 409 Conflict, 500 Internal Server Error.",
      },
      {
        q: "How does the Spring Security filter chain work?",
        a: "Requests pass through a chain of filters. A custom JWT filter reads the Authorization header, validates the token, builds an Authentication object and stores it in the SecurityContext. Later, authorization rules (hasRole, @PreAuthorize) decide access. Failures return 401 (not authenticated) or 403 (not allowed).",
        level: "advanced",
      },
    ],
  },
];
