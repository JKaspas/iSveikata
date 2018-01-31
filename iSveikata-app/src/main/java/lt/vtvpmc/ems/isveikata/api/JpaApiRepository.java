package lt.vtvpmc.ems.isveikata.api;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaApiRepository extends JpaRepository<Api, Long> {

    Api findByTitle(String title);
}
