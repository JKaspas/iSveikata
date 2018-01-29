package lt.vtvpmc.ems.isveikata.icd;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaIcdRepository extends JpaRepository<Icd, String> {
	List<Icd> findByTitleContaining(String title);
}
