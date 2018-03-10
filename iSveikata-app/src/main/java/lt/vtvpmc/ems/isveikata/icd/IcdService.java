package lt.vtvpmc.ems.isveikata.icd;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@Transactional
//@PreAuthorize("hasRole('Doctor')")
public class IcdService {

    @Autowired
    private JpaIcdRepository jpaIcdRepository;

    public void createIcd(Icd icd) {
        jpaIcdRepository.save(icd);
    }
    
    @PreAuthorize("hasRole('Doctor')")
    public List<Icd> getAllIcd() {
    	return jpaIcdRepository.findAll(new Sort(Sort.Direction.ASC, "icdCode"));
    }
    
    @PreAuthorize("hasRole('Doctor') OR hasRole('Patient')")
    public String getIcdTitle(String icdCode) {
        return jpaIcdRepository.findOne(icdCode).getTitle();
    }
}
