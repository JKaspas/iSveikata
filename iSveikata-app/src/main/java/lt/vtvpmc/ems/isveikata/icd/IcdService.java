package lt.vtvpmc.ems.isveikata.icd;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class IcdService {

    @Autowired
    private JpaIcdRepository jpaIcdRepository;

    public void createIcd(Icd icd) {
        jpaIcdRepository.save(icd);
    }

    public List<Icd> getAllIcd() {
        return jpaIcdRepository.findAll();
    }

    public String getIcdTitle(String icdCode) {
        return jpaIcdRepository.findOne(icdCode).getTitle();
    }
}
